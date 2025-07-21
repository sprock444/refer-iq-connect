import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Users, TrendingUp, Award, Video, FileText, Send, Camera, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { EmailPreview } from "@/components/email";
import { useReferrals } from "@/hooks/useReferrals";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { createReferral, isLoading } = useReferrals();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showCamera, setShowCamera] = useState<'video' | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const [formData, setFormData] = useState({
    referrerName: "",
    referrerEmail: "",
    recipientFirstName: "",
    recipientLastName: "",
    recipientEmail: "",
    candidateName: "",
    candidateEmail: "",
    relationship: "",
    position: "",
    linkedinUrl: "",
    resumeFile: null as File | null,
    videoFile: null as File | null,
    endorsement: ""
  });

  const [createdReferral, setCreatedReferral] = useState<any>(null);

  // Dynamic header text state
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [rotationCount, setRotationCount] = useState(0);
  const words = ["Candidates", "Colleagues", "Friends", "Family"];

  // Cycle through words with fade transition
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % words.length;
          
          // If we're back to "Candidates" (index 0), increment rotation count
          if (nextIndex === 0) {
            setRotationCount(prev => prev + 1);
          }
          
          return nextIndex;
        });
        setIsVisible(true);
      }, 200);
    }, 5000);

    // Stop after 2 complete rotations
    if (rotationCount >= 2) {
      clearInterval(interval);
      // Ensure we end on "Candidates"
      setCurrentWordIndex(0);
    }

    return () => clearInterval(interval);
  }, [rotationCount]);

  const startCamera = async () => {
    try {
      const constraints = { video: true, audio: true };
      
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      setShowCamera('video');
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const handleResumeFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOC, or DOCX file.",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB.",
        variant: "destructive"
      });
      return;
    }

    setFormData({ ...formData, resumeFile: file });
    
    toast({
      title: "Resume selected",
      description: "Resume file is ready to upload with your referral.",
    });
  };

  const startVideoRecording = () => {
    if (stream) {
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const file = new File([blob], 'video-endorsement.webm', { type: 'video/webm' });
        setFormData({ ...formData, videoFile: file });
        stopCamera();
        
        toast({
          title: "Video recorded",
          description: "Video endorsement is ready to upload with your referral.",
        });
      };
      
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    }
  };

  const stopVideoRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(null);
    setIsRecording(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const referral = await createReferral({
        referrerName: formData.referrerName,
        referrerEmail: formData.referrerEmail,
        recipientFirstName: formData.recipientFirstName,
        recipientLastName: formData.recipientLastName,
        recipientEmail: formData.recipientEmail,
        candidateName: formData.candidateName,
        candidateEmail: formData.candidateEmail,
        position: formData.position,
        relationship: formData.relationship as 'friend' | 'former-colleague' | 'family' | 'classmate' | 'other',
        linkedinUrl: formData.linkedinUrl || undefined,
        endorsementText: formData.endorsement || undefined,
      }, formData.resumeFile, formData.videoFile);

      console.log('Referral created:', referral);
      setCreatedReferral(referral);
      
      // Don't reset form data yet - user might want to send email
    } catch (error) {
      console.error('Error submitting referral:', error);
    }
  };

  const handleStartOver = () => {
    setCreatedReferral(null);
    setFormData({
      referrerName: "",
      referrerEmail: "",
      recipientFirstName: "",
      recipientLastName: "",
      recipientEmail: "",
      candidateName: "",
      candidateEmail: "",
      relationship: "",
      position: "",
      linkedinUrl: "",
      resumeFile: null,
      videoFile: null,
      endorsement: ""
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold">Record Video Endorsement</h3>
            </div>
            
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg"
              />
              <canvas ref={canvasRef} className="hidden" />
            </div>
            
            <div className="flex justify-center space-x-4 mt-4">
              {!isRecording ? (
                <Button onClick={startVideoRecording} className="bg-red-600 hover:bg-red-700">
                  <Video className="w-4 h-4 mr-2" />
                  Start Recording
                </Button>
              ) : (
                <Button onClick={stopVideoRecording} className="bg-gray-600 hover:bg-gray-700">
                  Stop Recording
                </Button>
              )}
              <Button onClick={stopCamera} variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">ReferIQ</h1>
            </div>
            <nav className="flex items-center space-x-6">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>Dashboard</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content - Two Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-20">
          {/* Left Column - Referral Form */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Start a Referral Now...</h2>
            </div>
            
            {createdReferral ? (
              // Show success message and email preview
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Referral Submitted Successfully!</h3>
                      <p className="text-gray-600 mb-4">
                        Your referral has been saved. You can now send an email to the hiring manager.
                      </p>
                      <Button onClick={handleStartOver} variant="outline">
                        Submit Another Referral
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <EmailPreview 
                  formData={formData} 
                  referralId={createdReferral.id}
                />
              </div>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Referrer Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="referrerName">Your Name</Label>
                      <Input
                        id="referrerName"
                        value={formData.referrerName}
                        onChange={(e) => setFormData({ ...formData, referrerName: e.target.value })}
                        placeholder="Input field"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="referrerEmail">Your Email</Label>
                      <Input
                        id="referrerEmail"
                        type="email"
                        value={formData.referrerEmail}
                        onChange={(e) => setFormData({ ...formData, referrerEmail: e.target.value })}
                        placeholder="Input field"
                        required
                      />
                    </div>
                  </div>

                  {/* Recipient Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Send To</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor="recipientFirstName">First Name</Label>
                        <Input
                          id="recipientFirstName"
                          value={formData.recipientFirstName}
                          onChange={(e) => setFormData({ ...formData, recipientFirstName: e.target.value })}
                          placeholder="First name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="recipientLastName">Last Name</Label>
                        <Input
                          id="recipientLastName"
                          value={formData.recipientLastName}
                          onChange={(e) => setFormData({ ...formData, recipientLastName: e.target.value })}
                          placeholder="Last name"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <Label htmlFor="recipientEmail">Email</Label>
                      <Input
                        id="recipientEmail"
                        type="email"
                        value={formData.recipientEmail}
                        onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
                        placeholder="recipient@company.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Candidate Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Candidate Info</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor="candidateName">Candidate Name</Label>
                        <Input
                          id="candidateName"
                          value={formData.candidateName}
                          onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                          placeholder="Candidate's full name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="candidateEmail">Candidate Email</Label>
                        <Input
                          id="candidateEmail"
                          value={formData.candidateEmail}
                          onChange={(e) => setFormData({ ...formData, candidateEmail: e.target.value })}
                          placeholder="candidate@email.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor="position">Job Posting</Label>
                        <Input
                          id="position"
                          value={formData.position}
                          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                          placeholder="Job Posting Link"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedinUrl">LinkedIn Profile</Label>
                        <Input
                          id="linkedinUrl"
                          value={formData.linkedinUrl}
                          onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                          placeholder="LinkedIn profile URL"
                        />
                      </div>
                    </div>
                    
                    {/* Video Endorsement - Moved up to highlight secret sauce */}
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Video Endorsement</h3>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                        <button
                          type="button"
                          onClick={startCamera}
                          className="w-full"
                        >
                          <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-1">
                            {formData.videoFile ? formData.videoFile.name : "Tap to record video endorsement"}
                          </p>
                          <p className="text-xs text-gray-500">
                            Use camera to record endorsement
                          </p>
                        </button>
                      </div>
                    </div>

                    {/* Written Endorsement */}
                    <div className="mb-4">
                      <Label htmlFor="endorsement">Written Endorsement (Optional)</Label>
                      <Textarea
                        id="endorsement"
                        value={formData.endorsement}
                        onChange={(e) => setFormData({ ...formData, endorsement: e.target.value })}
                        placeholder="Tell us why this candidate would be a great fit..."
                        rows={3}
                      />
                    </div>

                    {/* Resume File Upload */}
                    <div className="mb-4">
                      <Label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                        Resume Upload
                      </Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                        <input
                          type="file"
                          id="resume"
                          accept=".pdf,.doc,.docx"
                          onChange={handleResumeFileUpload}
                          className="hidden"
                        />
                        <label htmlFor="resume" className="cursor-pointer w-full block">
                          <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">
                            {formData.resumeFile 
                              ? formData.resumeFile.name 
                              : "Click to upload resume (PDF, DOC, DOCX)"
                            }
                          </p>
                        </label>
                      </div>
                    </div>

                    {/* Relationship */}
                    <div className="mb-4">
                      <Label htmlFor="relationship">Relationship</Label>
                      <Select value={formData.relationship} onValueChange={(value) => setFormData({ ...formData, relationship: value })} required>
                        <SelectTrigger id="relationship">
                          <SelectValue placeholder="Select your relationship" />
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
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isLoading ? "Submitting..." : "Submit Referral"}
                  </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Marketing Content */}
          <div className="space-y-8">
            {/* Hero Section with Dynamic Header */}
            <div className="text-center lg:text-left">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Elevate{" "}
                <span 
                  className={`text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 transition-opacity duration-200 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {words[currentWordIndex]}
                </span>{" "}
                Above the Noise
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                ReferIQ transforms employee referrals through video storytelling and AI-driven analysis, 
                helping great candidates stand out and hiring managers find the perfect fit faster.
              </p>
            </div>

            {/* Why ReferIQ Works */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center lg:text-left">Why ReferIQ Works</h3>
              <p className="text-gray-600 mb-6 text-center lg:text-left">
                Our platform combines the personal touch of employee endorsements with AI-powered insights
              </p>
              
              <div className="grid gap-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Video className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Video Storytelling</h4>
                    <p className="text-sm text-gray-600">
                      60-90 second endorsement videos that capture the personal connection and enthusiasm
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">AI-Powered Analysis</h4>
                    <p className="text-sm text-gray-600">
                      Sentiment analysis, role fit scoring, and cultural alignment assessment
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Structured Process</h4>
                    <p className="text-sm text-gray-600">
                      Organized workflow that elevates referrals above traditional applicant tracking noise
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-gray-100 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">How It Works</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <p className="text-sm text-gray-700">Record endorsement video explaining candidate's fit</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <p className="text-sm text-gray-700">AI analyzes sentiment, role fit, and cultural alignment</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <p className="text-sm text-gray-700">Smart delivery via email, Slack, or Teams with rich context</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                  <p className="text-sm text-gray-700">Track progress and get feedback on referral success</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">ReferIQ</span>
            </div>
            <p className="text-gray-400">© 2024 ReferIQ. Reinventing employee referrals.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
