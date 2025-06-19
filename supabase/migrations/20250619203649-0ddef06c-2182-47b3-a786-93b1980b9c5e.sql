
-- Create RLS policies for the video storage bucket
-- Allow anyone to insert files into the video bucket
CREATE POLICY "Allow video uploads" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'video');

-- Allow anyone to select files from the video bucket  
CREATE POLICY "Allow video downloads" ON storage.objects
  FOR SELECT USING (bucket_id = 'video');

-- Allow anyone to update files in the video bucket
CREATE POLICY "Allow video updates" ON storage.objects
  FOR UPDATE USING (bucket_id = 'video');

-- Allow anyone to delete files from the video bucket
CREATE POLICY "Allow video deletes" ON storage.objects
  FOR DELETE USING (bucket_id = 'video');
