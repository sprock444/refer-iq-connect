import { supabase } from '@/integrations/supabase/client';

export interface VideoThumbnail {
  id: string;
  dataUrl: string;
  timestamp: number;
}

export class ThumbnailCapture {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private captureInterval: number | null = null;
  private thumbnails: VideoThumbnail[] = [];

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 320;
    this.canvas.height = 240;
    this.context = this.canvas.getContext('2d')!;
  }

  startCapturing(videoElement: HTMLVideoElement, intervalMs: number = 2000) {
    this.thumbnails = [];
    
    this.captureInterval = window.setInterval(() => {
      if (videoElement.videoWidth > 0 && videoElement.videoHeight > 0) {
        this.captureThumbnail(videoElement);
      }
    }, intervalMs);
  }

  stopCapturing() {
    if (this.captureInterval) {
      clearInterval(this.captureInterval);
      this.captureInterval = null;
    }
  }

  private captureThumbnail(videoElement: HTMLVideoElement) {
    // Set canvas dimensions to maintain aspect ratio
    const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;
    this.canvas.width = 320;
    this.canvas.height = 320 / aspectRatio;

    // Draw current video frame to canvas
    this.context.drawImage(videoElement, 0, 0, this.canvas.width, this.canvas.height);

    // Convert to data URL
    const dataUrl = this.canvas.toDataURL('image/jpeg', 0.8);
    
    const thumbnail: VideoThumbnail = {
      id: `thumb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      dataUrl,
      timestamp: Date.now()
    };

    this.thumbnails.push(thumbnail);
  }

  getThumbnails(): VideoThumbnail[] {
    return this.thumbnails;
  }

  captureSingleFrame(videoElement: HTMLVideoElement): VideoThumbnail | null {
    if (videoElement.videoWidth === 0 || videoElement.videoHeight === 0) {
      return null;
    }

    // Set canvas dimensions to maintain aspect ratio
    const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;
    this.canvas.width = 320;
    this.canvas.height = 320 / aspectRatio;

    // Draw current video frame to canvas
    this.context.drawImage(videoElement, 0, 0, this.canvas.width, this.canvas.height);

    // Convert to data URL
    const dataUrl = this.canvas.toDataURL('image/jpeg', 0.8);
    
    const thumbnail: VideoThumbnail = {
      id: `thumb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      dataUrl,
      timestamp: Date.now()
    };

    return thumbnail;
  }

  async uploadThumbnail(thumbnail: VideoThumbnail): Promise<string | null> {
    try {
      // Convert data URL to blob
      const response = await fetch(thumbnail.dataUrl);
      const blob = await response.blob();
      
      // Create file
      const file = new File([blob], `thumbnail_${thumbnail.id}.jpg`, { type: 'image/jpeg' });
      
      // Upload to Supabase storage
      const filePath = `thumbnails/${thumbnail.id}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from('email-assets')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Error uploading thumbnail:', uploadError);
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase.storage
        .from('email-assets')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
      return null;
    }
  }
}