-- Make the video bucket public so videos can be accessed in email templates
UPDATE storage.buckets 
SET public = true 
WHERE id = 'video';