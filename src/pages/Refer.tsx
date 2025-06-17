
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Video, Upload, User, FileText, Send, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Refer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    referrerName: "",
    referrerEmail: "",
    candidateName: "",
    candidateEmail: "",
    relationship: "",
    position: "",
    linkedinUrl: "",
    resumeFile: null as File | null,
    videoFile: null as File | null,
    endorsement: "",
    whyFit: "",
    cultureAlignment: ""
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleFileUpload = (file: File, type: 'resume' | 'video') => {
    if (type === 'resume') {
      setFormData({ ...formData, resumeFile: file });
    } else {
      setFormData({ ...formData, videoFile: file });
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Referral Submitted!",
      description: "Your referral has been processed and will be reviewed by our AI system.",
    });
    navigate('/dashboard');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Referrer Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="referrerName">Your Name</Label>
                  <Input
                    id="referrerName"
                    value={formData.referrerName}
                    onChange={(e) => setFormData({ ...formData, referrerName: e.target.value })}
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <Label htmlFor="referrerEmail">Your Email</Label>
                  <Input
                    id="referrerEmail"
                    type="email"
                    value={formData.referrerEmail}
                    onChange={(e) => setFormData({ ...formData, referrerEmail: e.target.value })}
                    placeholder="john@company.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Candidate Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="candidateName">Candidate Name</Label>
                  <Input
                    id="candidateName"
                    value={formData.candidateName}
                    onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="candidateEmail">Candidate Email</Label>
                  <Input
                    id="candidateEmail"
                    type="email"
                    value={formData.candidateEmail}
                    onChange={(e) => setFormData({ ...formData, candidateEmail: e.target.value })}
                    placeholder="jane@email.com"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="relationship">Your Relationship</Label>
                <Select value={formData.relationship} onValueChange={(value) => setFormData({ ...formData, relationship: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="former-colleague">Former Colleague</SelectItem>
                    <SelectItem value="family">Family</SelectItem>
                    <SelectItem value="classmate">Classmate</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="position">Position/Role</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="Software Engineer"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Candidate Materials</h3>
            
            <div>
              <Label htmlFor="linkedinUrl">LinkedIn Profile (Optional)</Label>
              <Input
                id="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                placeholder="https://linkedin.com/in/candidate"
              />
            </div>

            <div>
              <Label htmlFor="resume">Resume Upload</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files[0], 'resume')}
                  className="hidden"
                />
                <label htmlFor="resume" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    {formData.resumeFile ? formData.resumeFile.name : "Click to upload resume (PDF, DOC, DOCX)"}
                  </p>
                </label>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Video Endorsement</h3>
            <p className="text-gray-600 mb-4">
              Record a 60-90 second video explaining why this candidate would be a great fit.
            </p>

            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h4 className="font-medium text-blue-900 mb-2">What to include in your video:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• How do you know the candidate?</li>
                <li>• Why are they a fit for this role?</li>
                <li>• Why would they be a good addition to our company?</li>
              </ul>
            </div>

            <div>
              <Label htmlFor="video">Video Upload</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  id="video"
                  accept="video/*"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files[0], 'video')}
                  className="hidden"
                />
                <label htmlFor="video" className="cursor-pointer">
                  <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    {formData.videoFile ? formData.videoFile.name : "Upload Your Video Endorsement"}
                  </p>
                  <p className="text-sm text-gray-500">
                    MP4, MOV, or WebM (Max 100MB)
                  </p>
                </label>
              </div>
            </div>

            <div>
              <Label htmlFor="endorsement">Written Endorsement (Optional)</Label>
              <Textarea
                id="endorsement"
                value={formData.endorsement}
                onChange={(e) => setFormData({ ...formData, endorsement: e.target.value })}
                placeholder="Additional notes about the candidate..."
                rows={4}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Review & Submit</h3>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Referral Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Candidate:</p>
                    <p className="text-gray-600">{formData.candidateName}</p>
                  </div>
                  <div>
                    <p className="font-medium">Position:</p>
                    <p className="text-gray-600">{formData.position}</p>
                  </div>
                  <div>
                    <p className="font-medium">Relationship:</p>
                    <Badge variant="secondary">{formData.relationship}</Badge>
                  </div>
                  <div>
                    <p className="font-medium">Materials:</p>
                    <div className="flex gap-2">
                      {formData.resumeFile && <Badge variant="outline">Resume</Badge>}
                      {formData.videoFile && <Badge variant="outline">Video</Badge>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">What happens next?</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Your video will be analyzed by our AI for sentiment and fit scoring</li>
                <li>• A comprehensive referral package will be created</li>
                <li>• The hiring manager will receive the referral via their preferred channel</li>
                <li>• You'll receive updates on the referral status</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">ReferIQ</h1>
            </div>
            <Badge variant="outline">Step {currentStep} of {totalSteps}</Badge>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Progress value={progress} className="w-full" />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Create Employee Referral</CardTitle>
          </CardHeader>
          <CardContent>
            {renderStep()}
            
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep === totalSteps ? (
                <Button onClick={handleSubmit} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Referral
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  Next
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Refer;
