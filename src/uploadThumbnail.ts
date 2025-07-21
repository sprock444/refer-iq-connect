
import { supabase } from "@/integrations/supabase/client";

// This is a one-time utility to upload the video thumbnail to Supabase storage
export async function uploadVideoThumbnail() {
  try {
    // Create a canvas with a professional video thumbnail
    const canvas = document.createElement('canvas');
    canvas.width = 480;
    canvas.height = 270;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }

    // Create a gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#2563eb');
    gradient.addColorStop(1, '#1e40af');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add a professional overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add centered text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Personal Video Message', canvas.width / 2, canvas.height / 2 - 20);
    
    ctx.font = '16px Arial, sans-serif';
    ctx.fillText('Click to play endorsement video', canvas.width / 2, canvas.height / 2 + 20);

    // Add play button circle
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2 + 60;
    const radius = 30;
    
    // Draw circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fill();
    
    // Draw play triangle
    ctx.beginPath();
    ctx.moveTo(centerX - 10, centerY - 12);
    ctx.lineTo(centerX - 10, centerY + 12);
    ctx.lineTo(centerX + 15, centerY);
    ctx.closePath();
    ctx.fillStyle = '#2563eb';
    ctx.fill();

    // Convert canvas to blob
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, 'image/jpeg', 0.9);
    });

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
