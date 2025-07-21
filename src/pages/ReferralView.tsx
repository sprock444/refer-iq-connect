import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { EmailTemplate } from "@/components/email";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReferralData {
  id: string;
  referrer_name: string;
  candidate_name: string;
  candidate_email: string;
  position: string;
  relationship: string;
  linkedin_url?: string;
  portfolio_url?: string;
  endorsement_text?: string;
  why_fit?: string;
  culture_alignment?: string;
  video_file_path?: string;
  resume_file_path?: string;
  ai_insights?: any;
}

const ReferralView = () => {
  const { id } = useParams<{ id: string }>();
  const [referralData, setReferralData] = useState<ReferralData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchReferral = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('referrals')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching referral:', error);
          toast({
            title: "Error",
            description: "Failed to load referral data",
            variant: "destructive",
          });
          return;
        }

        setReferralData(data);
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReferral();
  }, [id, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading referral...</p>
        </div>
      </div>
    );
  }

  if (!referralData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Referral Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The referral you're looking for doesn't exist or may have been removed.
          </p>
          <Button onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </Card>
      </div>
    );
  }

  const formattedData = {
    referrerName: referralData.referrer_name,
    candidateName: referralData.candidate_name,
    candidateEmail: referralData.candidate_email,
    position: referralData.position,
    relationship: referralData.relationship,
    linkedinUrl: referralData.linkedin_url || '',
    portfolioUrl: referralData.portfolio_url || '',
    endorsement: referralData.endorsement_text || '',
    whyFit: referralData.why_fit || '',
    cultureAlignment: referralData.culture_alignment || '',
    videoFile: referralData.video_file_path ? { path: referralData.video_file_path } : null,
    resumeFile: referralData.resume_file_path ? { path: referralData.resume_file_path } : null,
    aiInsights: referralData.ai_insights || {
      skillsMatch: "85%",
      cultureAlignment: "92%",
      experienceLevel: "Senior",
      keyStrengths: ["Leadership", "Technical Excellence", "Team Collaboration"],
      potentialConcerns: ["None identified"],
      recommendation: "Highly Recommended"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Candidate Referral</h1>
          <p className="text-muted-foreground">
            Referral for {referralData.candidate_name} - {referralData.position}
          </p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <EmailTemplate
            referrerName={formattedData.referrerName}
            candidateName={formattedData.candidateName}
            position={formattedData.position}
            relationship={formattedData.relationship}
            videoFile={formattedData.videoFile}
            resumeFile={formattedData.resumeFile}
            linkedinUrl={formattedData.linkedinUrl}
            portfolioUrl={formattedData.portfolioUrl}
            endorsementText={formattedData.endorsement}
            aiInsights={formattedData.aiInsights}
            isLandingPage={true}
            referralId={id}
          />
        </Card>
      </div>
    </div>
  );
};

export default ReferralView;