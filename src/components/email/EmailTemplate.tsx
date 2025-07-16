
import React from 'react';
import { Play, ExternalLink, FileText, Linkedin, User, Video } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface EmailTemplateProps {
  referrerName: string;
  candidateName: string;
  position: string;
  relationship: string;
  videoFile?: File | null;
  resumeFile?: File | null;
  linkedinUrl?: string;
  portfolioUrl?: string;
  endorsementText?: string;
  aiInsights?: {
    roleFit: number;
    culturalFit: number;
    authenticity: number;
    summary: string;
  };
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({
  referrerName,
  candidateName,
  position,
  relationship,
  videoFile,
  resumeFile,
  linkedinUrl,
  portfolioUrl,
  endorsementText,
  aiInsights = {
    roleFit: 92,
    culturalFit: 87,
    authenticity: 94,
    summary: "Candidate demonstrates exceptional technical communication and genuine enthusiasm. Video analysis shows strong confidence indicators and natural speech patterns. Responses align perfectly with company values around innovation and collaboration."
  }
}) => {
  // Get the video URL from Supabase storage
  const getVideoUrl = () => {
    const { data } = supabase.storage
      .from('video')
      .getPublicUrl('1752669755179-6f0hc0vzked.webm');
    return data.publicUrl;
  };
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb'
    }}>
      {/* Compact Header with ReferIQ branding */}
      <div style={{
        background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <div style={{
          width: '24px',
          height: '24px',
          background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Video style={{ color: '#ffffff', width: '14px', height: '14px' }} />
        </div>
        <div>
          <h1 style={{
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: 'bold',
            margin: '0'
          }}>ReferIQ</h1>
          <p style={{
            color: '#dbeafe',
            fontSize: '11px',
            margin: '0'
          }}>Video Referral Ready for Review</p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '20px 24px' }}>
        {/* Video Section - Top Priority */}
        <div style={{
          backgroundColor: '#1f2937',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '20px',
          position: 'relative' as const
        }}>
          <h3 style={{
            color: '#ffffff',
            fontSize: '16px',
            margin: '0 0 12px 0',
            fontWeight: 'bold',
            textAlign: 'center' as const
          }}>
            Personal Endorsement Video
          </h3>
          <video 
            controls
            style={{
              width: '100%',
              maxWidth: '480px',
              height: 'auto',
              borderRadius: '6px',
              display: 'block',
              margin: '0 auto'
            }}
          >
            <source src={getVideoUrl()} type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <p style={{
            color: '#d1d5db',
            fontSize: '12px',
            margin: '8px 0 0 0',
            textAlign: 'center' as const
          }}>
            {referrerName}'s endorsement for {candidateName}
          </p>
        </div>

        {/* Candidate Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#2563eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '12px'
          }}>
            <span style={{
              color: '#ffffff',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
              {candidateName.split(' ').map(n => n[0]).join('').toUpperCase()}
            </span>
          </div>
          <div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#111827',
              margin: '0 0 2px 0'
            }}>
              {candidateName}
            </h2>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              margin: '0 0 2px 0'
            }}>
              {position}
            </p>
            <p style={{
              fontSize: '12px',
              color: '#2563eb',
              margin: '0'
            }}>
              Referred by: {referrerName}
            </p>
          </div>
        </div>

        {/* Quick Action Links */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '16px',
          flexWrap: 'wrap' as const
        }}>
          {resumeFile && (
            <a href="/resume" style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: '#dc2626',
              color: '#ffffff',
              padding: '8px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              textDecoration: 'none',
              fontWeight: '600'
            }}>
              <FileText style={{ width: '14px', height: '14px', marginRight: '6px' }} />
              Download Resume
            </a>
          )}
          {linkedinUrl && (
            <a href={linkedinUrl} style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: '#0077b5',
              color: '#ffffff',
              padding: '8px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              textDecoration: 'none',
              fontWeight: '600'
            }}>
              <Linkedin style={{ width: '14px', height: '14px', marginRight: '6px' }} />
              LinkedIn Profile
            </a>
          )}
          {portfolioUrl && (
            <a href={portfolioUrl} style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: '#059669',
              color: '#ffffff',
              padding: '8px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              textDecoration: 'none',
              fontWeight: '600'
            }}>
              <ExternalLink style={{ width: '14px', height: '14px', marginRight: '6px' }} />
              Portfolio
            </a>
          )}
        </div>

        {/* AI Insights Scores */}
        <div style={{
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '16px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#1e293b',
            margin: '0 0 12px 0',
            textAlign: 'center' as const
          }}>
            AI Analysis Results
          </h3>
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            textAlign: 'center' as const
          }}>
            <div>
              <div style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#059669',
                margin: '0'
              }}>
                {aiInsights.roleFit}
              </div>
              <div style={{
                fontSize: '10px',
                color: '#64748b',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.5px'
              }}>
                ROLE FIT
              </div>
            </div>
            <div>
              <div style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#059669',
                margin: '0'
              }}>
                {aiInsights.culturalFit}
              </div>
              <div style={{
                fontSize: '10px',
                color: '#64748b',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.5px'
              }}>
                CULTURAL FIT
              </div>
            </div>
            <div>
              <div style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#059669',
                margin: '0'
              }}>
                {aiInsights.authenticity}
              </div>
              <div style={{
                fontSize: '10px',
                color: '#64748b',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.5px'
              }}>
                AUTHENTICITY
              </div>
            </div>
          </div>
        </div>

        {/* Endorsement Quote */}
        {endorsementText && (
          <div style={{
            borderLeft: '4px solid #2563eb',
            paddingLeft: '16px',
            marginBottom: '20px',
            backgroundColor: '#eff6ff',
            padding: '16px',
            borderRadius: '6px'
          }}>
            <p style={{
              fontSize: '14px',
              color: '#1e40af',
              fontStyle: 'italic',
              margin: '0 0 8px 0',
              lineHeight: '1.5'
            }}>
              "{endorsementText}"
            </p>
            <p style={{
              fontSize: '12px',
              color: '#1e40af',
              margin: '0',
              fontWeight: 'bold'
            }}>
              — {referrerName}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '16px'
        }}>
          <a href="#" style={{
            backgroundColor: '#2563eb',
            color: '#ffffff',
            padding: '12px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '14px',
            flex: '1',
            textAlign: 'center' as const
          }}>
            Review Full Profile
          </a>
          <a href="#" style={{
            backgroundColor: '#ffffff',
            color: '#2563eb',
            padding: '12px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '14px',
            border: '2px solid #2563eb',
            flex: '1',
            textAlign: 'center' as const
          }}>
            Schedule Interview
          </a>
        </div>

        {/* Footer */}
        <div style={{
          borderTop: '1px solid #e5e7eb',
          paddingTop: '16px',
          fontSize: '11px',
          color: '#6b7280',
          textAlign: 'center' as const
        }}>
          <p style={{ margin: '0 0 6px 0' }}>
            This referral expires in 7 days if no action is taken.
          </p>
          <p style={{ margin: '0' }}>
            <a href="#" style={{ color: '#2563eb' }}>Contact Support</a> | <a href="#" style={{ color: '#2563eb' }}>View in Dashboard</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplate;
