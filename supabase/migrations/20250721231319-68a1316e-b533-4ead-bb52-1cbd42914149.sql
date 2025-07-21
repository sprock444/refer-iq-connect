-- Create a public bucket for email assets
INSERT INTO storage.buckets (id, name, public) VALUES ('email-assets', 'email-assets', true);

-- Create policy to allow public access to email assets
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'email-assets');