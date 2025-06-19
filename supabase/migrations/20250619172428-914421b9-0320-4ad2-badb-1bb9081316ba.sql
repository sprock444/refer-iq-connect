
-- Create RLS policies for the resume storage bucket
-- Allow anyone to insert files into the resume bucket
CREATE POLICY "Allow resume uploads" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'resume');

-- Allow anyone to select files from the resume bucket  
CREATE POLICY "Allow resume downloads" ON storage.objects
  FOR SELECT USING (bucket_id = 'resume');

-- Allow anyone to update files in the resume bucket
CREATE POLICY "Allow resume updates" ON storage.objects
  FOR UPDATE USING (bucket_id = 'resume');

-- Allow anyone to delete files from the resume bucket
CREATE POLICY "Allow resume deletes" ON storage.objects
  FOR DELETE USING (bucket_id = 'resume');
