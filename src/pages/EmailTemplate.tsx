
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { EmailTemplate } from '@/components/email';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmailTemplatePage = () => {
  const [formData, setFormData] = useState({
    referrerName: 'John Smith',
    candidateName: 'Alex Chen',
    position: 'Senior Frontend Developer',
    relationship: 'former-colleague',
    linkedinUrl: 'https://linkedin.com/in/alexchen',
    portfolioUrl: 'https://alexchen.dev',
    endorsement: "I'm excited about this opportunity because I've been following your company's innovation in React frameworks, and I believe Alex's experience building scalable component libraries would be a perfect fit. Their problem-solving skills and collaborative approach make them an ideal team member."
  });

  const [hasVideo, setHasVideo] = useState(true);
  const [hasResume, setHasResume] = useState(true);

  const sampleAIInsights = {
    roleFit: 92,
    culturalFit: 87,
    authenticity: 94,
    summary: "Candidate demonstrates exceptional technical communication and genuine enthusiasm. Video analysis shows strong confidence indicators and natural speech patterns. Responses align perfectly with company values around innovation and collaboration."
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Email Template Preview</h1>
          <p className="text-gray-600 mt-2">Test and customize your referral email template</p>
        </div>

        <div className="space-y-6">
          {/* Email Preview - Full Width */}
          <Card>
            <CardContent className="p-0">
              <div className="border rounded-lg overflow-hidden bg-white">
                {/* Email Header Interface */}
                <div className="bg-gray-50 border-b px-4 py-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>From:</span>
                      <span className="font-medium">{formData.referrerName} &lt;{formData.referrerName.toLowerCase().replace(' ', '.')}@company.com&gt;</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date().toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                    <span>To:</span>
                    <span>hiring@company.com</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-600">Subject:</span>
                    <span className="font-semibold text-gray-900">You Have a Referral from {formData.referrerName}</span>
                  </div>
                </div>

                {/* Email Body */}
                <EmailTemplate
                  referrerName={formData.referrerName}
                  candidateName={formData.candidateName}
                  position={formData.position}
                  relationship={formData.relationship}
                  videoFile={hasVideo ? new File([], 'video.mp4') : null}
                  resumeFile={hasResume ? new File([], 'resume.pdf') : null}
                  linkedinUrl={formData.linkedinUrl}
                  portfolioUrl={formData.portfolioUrl}
                  endorsementText={formData.endorsement}
                  aiInsights={sampleAIInsights}
                />
              </div>
            </CardContent>
          </Card>

          {/* Controls Panel - Bottom */}
          <Card>
            <CardHeader>
              <CardTitle>Template Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="referrerName">Referrer Name</Label>
                  <Input
                    id="referrerName"
                    value={formData.referrerName}
                    onChange={(e) => handleInputChange('referrerName', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="candidateName">Candidate Name</Label>
                  <Input
                    id="candidateName"
                    value={formData.candidateName}
                    onChange={(e) => handleInputChange('candidateName', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                  <Input
                    id="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="portfolioUrl">Portfolio URL</Label>
                  <Input
                    id="portfolioUrl"
                    value={formData.portfolioUrl}
                    onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
                  />
                </div>

                <div className="flex gap-4 items-end">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="hasVideo"
                      checked={hasVideo}
                      onChange={(e) => setHasVideo(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="hasVideo">Include Video</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="hasResume"
                      checked={hasResume}
                      onChange={(e) => setHasResume(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="hasResume">Include Resume</Label>
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <Label htmlFor="endorsement">Endorsement Text</Label>
                <Textarea
                  id="endorsement"
                  value={formData.endorsement}
                  onChange={(e) => handleInputChange('endorsement', e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplatePage;
