
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Eye, Mail, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import EmailTemplate from './EmailTemplate';

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

  // Sample AI insights data for demonstration
  const sampleAIInsights = {
    roleFit: 92,
    culturalFit: 87,
    authenticity: 94,
    summary: "Candidate demonstrates exceptional technical communication and genuine enthusiasm. Video analysis shows strong confidence indicators and natural speech patterns. Responses align perfectly with company values around innovation and collaboration."
  };

  const handleCopyHTML = () => {
    // In a real implementation, this would generate the actual HTML string
    const htmlContent = `<!-- Email HTML would be generated here -->`;
    navigator.clipboard.writeText(htmlContent);
    toast({
      title: "HTML Copied!",
      description: "Email HTML has been copied to clipboard.",
    });
  };

  const handleSendEmail = () => {
    toast({
      title: "Email Sent!",
      description: "Referral email has been sent to the hiring manager.",
    });
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
                </DialogHeader>
                <div className="mt-4">
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

          {/* Email Summary */}
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
