import { supabase } from "@/integrations/supabase/client";

// This is a one-time utility to upload the video thumbnail to Supabase storage
export async function uploadVideoThumbnail() {
  try {
    // Convert the existing file to a blob
    const response = await fetch('/video-thumbnail.jpg');
    const blob = await response.blob();
    const file = new File([blob], 'video-thumbnail.jpg', { type: 'image/jpeg' });

    // Upload to Supabase storage
    const { data, error } = await supabase.storage
      .from('email-assets')
      .upload('video-thumbnail.jpg', file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('Error uploading thumbnail:', error);
      return false;
    }

    console.log('Thumbnail uploaded successfully:', data);
    return true;
  } catch (error) {
    console.error('Error uploading thumbnail:', error);
    return false;
  }
}