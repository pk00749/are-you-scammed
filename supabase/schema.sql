-- Supabase schema for 骗了吗 (Are You Scammed?)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create scams table
CREATE TABLE IF NOT EXISTS scams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  category_slug TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  severity TEXT NOT NULL CHECK (severity IN ('high', 'medium', 'low')),
  amount_range TEXT NOT NULL,
  scripts TEXT[] NOT NULL DEFAULT '{}',
  red_flags JSONB NOT NULL DEFAULT '[]',
  cases JSONB NOT NULL DEFAULT '[]',
  actions TEXT[] NOT NULL DEFAULT '{}',
  source_url TEXT,
  source_name TEXT,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  view_count INTEGER NOT NULL DEFAULT 0,
  hot_score INTEGER NOT NULL DEFAULT 0
);

-- Create contributions table
CREATE TABLE IF NOT EXISTS contributions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  scripts TEXT NOT NULL,
  amount TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);

-- Create indexes for full-text search
CREATE INDEX IF NOT EXISTS idx_scams_title ON scams USING gin(to_tsvector('simple', title));
CREATE INDEX IF NOT EXISTS idx_scams_tags ON scams USING gin(tags);
CREATE INDEX IF NOT EXISTS idx_scams_category_slug ON scams(category_slug);
CREATE INDEX IF NOT EXISTS idx_scams_hot_score ON scams(hot_score DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for scams table
DROP TRIGGER IF EXISTS update_scams_updated_at ON scams;
CREATE TRIGGER update_scams_updated_at
  BEFORE UPDATE ON scams
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) - disabled for MVP, enable in production
-- ALTER TABLE scams ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;
