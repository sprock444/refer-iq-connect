-- Create storage policies for email-assets bucket to allow public uploads
CREATE POLICY "Allow public uploads to email-assets bucket" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'email-assets');

CREATE POLICY "Allow public access to email-assets bucket" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'email-assets');

CREATE POLICY "Allow public updates to email-assets bucket" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'email-assets');