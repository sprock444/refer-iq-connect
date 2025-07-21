
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
    position: string;
    relationship: string;
    videoFile: File | null;
    resumeFile: File | null;
    linkedinUrl: string;
    endorsement: string;
  };
}

const EmailPreview: React.FC<EmailPreviewProps> = ({ formData }) => {
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
    try {
      // Create HTML content from the email template
      const emailElement = document.createElement('div');
      emailElement.innerHTML = document.querySelector('[data-email-content]')?.innerHTML || '';
      const htmlContent = emailElement.outerHTML;

      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          referralId: 'temp-id', // TODO: Pass actual referral ID
          recipientEmail: formData.candidateEmail,
          recipientName: formData.candidateName,
          htmlContent: htmlContent,
          subject: `Referral for ${formData.position} - ${formData.candidateName}`
        }
      });

      if (error) throw error;

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

            <Button onClick={handleSendEmail} className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Send Email
            </Button>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Email Summary</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>To:</strong> hiring-manager@company.com</p>
              <p><strong>Subject:</strong> New Referral: {formData.candidateName || "Candidate Name"} for {formData.position || "Position"}</p>
              <p><strong>Includes:</strong> Video endorsement, AI analysis, resume, LinkedIn profile</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailPreview;
