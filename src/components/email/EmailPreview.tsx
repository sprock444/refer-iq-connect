
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Eye, Mail, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import EmailTemplate from './EmailTemplate';
import { supabase } from '@/integrations/supabase/client';

interface EmailPreviewProps {
  formData: {
    referrerName: string;
    candidateName: string;
    candidateEmail: string;
    recipientFirstName: string;
    recipientLastName: string;
    recipientEmail: string;
    position: string;
    relationship: string;
    videoFile: File | null;
    resumeFile: File | null;
    linkedinUrl: string;
    endorsement: string;
  };
  referralId?: string;
}

const EmailPreview: React.FC<EmailPreviewProps> = ({ formData, referralId }) => {
  const { toast } = useToast();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const sampleAIInsights = {
    roleFit: 92,
    culturalFit: 87,
    authenticity: 94,
    summary: "Candidate demonstrates exceptional technical communication and genuine enthusiasm. Video analysis shows strong confidence indicators and natural speech patterns. Responses align perfectly with company values around innovation and collaboration."
  };

  const handleCopyHTML = () => {
    const htmlContent = `<!-- Email HTML would be generated here -->`;
    navigator.clipboard.writeText(htmlContent);
    toast({
      title: "HTML Copied!",
      description: "Email HTML has been copied to clipboard.",
    });
  };

  const handleSendEmail = async () => {
    if (!referralId) {
      toast({
        title: "Error",
        description: "Please save the referral first before sending email.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Generate HTML using the EmailTemplate component
      const emailTemplateHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Referral for ${formData.position} - ${formData.candidateName}</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f3f4f6;">
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%); padding: 12px 24px; display: flex; align-items: center; gap: 8px;">
              <div style="width: 24px; height: 24px; background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%); border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                <div style="color: #ffffff; width: 14px; height: 14px;">📹</div>
              </div>
              <div>
                <h1 style="color: #ffffff; font-size: 16px; font-weight: bold; margin: 0;">ReferIQ</h1>
                <p style="color: #dbeafe; font-size: 11px; margin: 0;">Video Referral Ready for Review</p>
              </div>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 20px 24px;">
              <!-- Candidate Header -->
              <div style="display: flex; align-items: center; margin-bottom: 16px;">
                <div style="width: 48px; height: 48px; border-radius: 50%; background-color: #2563eb; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                  <span style="color: #ffffff; font-size: 18px; font-weight: bold;">
                    ${formData.candidateName.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <div>
                  <h2 style="font-size: 20px; font-weight: bold; color: #111827; margin: 0 0 2px 0;">${formData.candidateName}</h2>
                  <p style="font-size: 14px; color: #6b7280; margin: 0 0 2px 0;">${formData.position}</p>
                  <p style="font-size: 12px; color: #2563eb; margin: 0;">Referred by: ${formData.referrerName}</p>
                </div>
              </div>

              <!-- Video Section -->
              <div style="background-color: #1f2937; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
                <h3 style="color: #ffffff; font-size: 16px; margin: 0 0 12px 0; font-weight: bold; text-align: center;">Personal Endorsement Video</h3>
                <div style="width: 100%; max-width: 480px; height: 270px; margin: 0 auto; border-radius: 6px; overflow: hidden; background: linear-gradient(135deg, #1f2937 0%, #374151 100%); position: relative;">
                  <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: rgba(37, 99, 235, 0.9); border-radius: 50%; width: 64px; height: 64px; display: flex; align-items: center; justify-content: center;">
                    <div style="color: #ffffff; width: 24px; height: 24px; margin-left: 4px;">▶️</div>
                  </div>
                  <div style="position: absolute; bottom: 16px; left: 16px; right: 16px; background-color: rgba(0, 0, 0, 0.7); color: #ffffff; padding: 8px 12px; border-radius: 4px; font-size: 12px; text-align: center;">
                    Click to view ${formData.referrerName}'s video endorsement
                  </div>
                </div>
                <p style="color: #d1d5db; font-size: 12px; margin: 8px 0 0 0; text-align: center;">${formData.referrerName}'s endorsement for ${formData.candidateName}</p>
              </div>

              <!-- AI Insights -->
              <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 16px; border: 1px solid #e2e8f0;">
                <h3 style="font-size: 14px; font-weight: bold; color: #1e293b; margin: 0 0 12px 0; text-align: center;">AI Analysis Results</h3>
                <div style="display: flex; justify-content: space-around; text-align: center;">
                  <div>
                    <div style="font-size: 28px; font-weight: bold; color: #059669; margin: 0;">92</div>
                    <div style="font-size: 10px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">ROLE FIT</div>
                  </div>
                  <div>
                    <div style="font-size: 28px; font-weight: bold; color: #059669; margin: 0;">87</div>
                    <div style="font-size: 10px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">CULTURAL FIT</div>
                  </div>
                  <div>
                    <div style="font-size: 28px; font-weight: bold; color: #059669; margin: 0;">94</div>
                    <div style="font-size: 10px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">AUTHENTICITY</div>
                  </div>
                </div>
              </div>

              <!-- Endorsement Quote -->
              ${formData.endorsement ? `
              <div style="border-left: 4px solid #2563eb; background-color: #eff6ff; padding: 16px; border-radius: 6px; margin-bottom: 20px;">
                <p style="font-size: 14px; color: #1e40af; font-style: italic; margin: 0 0 8px 0; line-height: 1.5;">"${formData.endorsement}"</p>
                <p style="font-size: 12px; color: #1e40af; margin: 0; font-weight: bold;">— ${formData.referrerName}</p>
              </div>
              ` : ''}

              <!-- Quick Links -->
              ${formData.linkedinUrl ? `
              <div style="margin-bottom: 16px;">
                <a href="${formData.linkedinUrl}" style="display: inline-flex; align-items: center; justify-content: center; background-color: #0077b5; color: #ffffff; padding: 8px 12px; border-radius: 6px; font-size: 12px; text-decoration: none; font-weight: 600;">
                  🔗 LinkedIn Profile
                </a>
              </div>
              ` : ''}

              <!-- Action Buttons -->
              <div style="margin-bottom: 16px;">
                <a href="#" style="background-color: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block; text-align: center; margin-right: 12px;">Review Full Profile</a>
                <a href="#" style="background-color: #ffffff; color: #2563eb; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px; border: 2px solid #2563eb; display: inline-block; text-align: center;">Schedule Interview</a>
              </div>

              <!-- Footer -->
              <div style="border-top: 1px solid #e5e7eb; padding-top: 16px; font-size: 11px; color: #6b7280; text-align: center;">
                <p style="margin: 0 0 6px 0;">This referral expires in 7 days if no action is taken.</p>
                <p style="margin: 0;">Powered by ReferIQ</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;

      console.log('Sending email with referralId:', referralId);

      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          referralId: referralId,
          recipientEmail: formData.recipientEmail,
          recipientName: `${formData.recipientFirstName} ${formData.recipientLastName}`,
          htmlContent: emailTemplateHtml,
          subject: `Referral for ${formData.position} - ${formData.candidateName}`
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('Email sent successfully:', data);

      toast({
        title: "Email Sent!",
        description: "The referral email has been sent successfully.",
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "Failed to send email. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Preview how your referral will appear in the hiring manager's inbox.
          </p>
          
          <div className="flex gap-2">
            <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Preview Email
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Email Preview</DialogTitle>
                  <DialogDescription>
                    Preview of the referral email that will be sent to the hiring manager.
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4" data-email-content>
                  <EmailTemplate
                    referrerName={formData.referrerName || "John Smith"}
                    candidateName={formData.candidateName || "Alex Chen"}
                    position={formData.position || "Senior Frontend Developer"}
                    relationship={formData.relationship || "former-colleague"}
                    videoFile={formData.videoFile}
                    resumeFile={formData.resumeFile}
                    linkedinUrl={formData.linkedinUrl}
                    portfolioUrl="https://alexchen.dev"
                    endorsementText={formData.endorsement || "I'm excited about this opportunity because I've been following TechCorp's innovation in React frameworks, and I believe my experience building scalable component libraries would be a perfect fit..."}
                    aiInsights={sampleAIInsights}
                  />
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline" onClick={handleCopyHTML} className="flex items-center gap-2">
              <Copy className="w-4 h-4" />
              Copy HTML
            </Button>

            <Button 
              onClick={handleSendEmail} 
              className="flex items-center gap-2"
              disabled={!referralId}
            >
              <Mail className="w-4 h-4" />
              Send Email
            </Button>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Email Summary</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>To:</strong> {formData.recipientEmail || "recipient@company.com"}</p>
              <p><strong>Subject:</strong> Referral for {formData.position || "Position"} - {formData.candidateName || "Candidate Name"}</p>
              <p><strong>Includes:</strong> Video endorsement, AI analysis, resume, LinkedIn profile</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailPreview;
