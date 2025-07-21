
import React from 'react';
import { Play, ExternalLink, FileText, Linkedin, User, Video } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface EmailTemplateProps {
  referrerName: string;
  candidateName: string;
  position: string;
  relationship: string;
  videoFile?: File | null | { path: string };
  resumeFile?: File | null | { path: string };
  linkedinUrl?: string;
  portfolioUrl?: string;
  endorsementText?: string;
  aiInsights?: {
    roleFit: number;
    culturalFit: number;
    authenticity: number;
    summary: string;
  };
  isLandingPage?: boolean;
  referralId?: string;
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
  isLandingPage = false,
  referralId,
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
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23 7l-7 5 7 5V7z" fill="#ffffff"/>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" fill="#ffffff"/>
          </svg>
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
          {isLandingPage ? (
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
          ) : (
            <a href={`/referral/${referralId}`} style={{
              position: 'relative' as const,
              width: '100%',
              maxWidth: '480px',
              height: '270px',
              margin: '0 auto',
              borderRadius: '6px',
              overflow: 'hidden',
              cursor: 'pointer',
              backgroundImage: 'url(https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=500&h=300&fit=crop&crop=face)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'block',
              textDecoration: 'none'
            }}>
              {/* Dark overlay for better contrast */}
              <div style={{
                position: 'absolute' as const,
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                backgroundColor: 'rgba(0, 0, 0, 0.3)'
              }}></div>
              
              {/* Play button */}
              <div style={{
                position: 'absolute' as const,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(37, 99, 235, 0.9)',
                borderRadius: '50%',
                width: '64px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: '2'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="5,3 19,12 5,21" fill="#ffffff"/>
                </svg>
              </div>
              
              {/* Video duration badge */}
              <div style={{
                position: 'absolute' as const,
                bottom: '12px',
                right: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: '#ffffff',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: 'bold'
              }}>
                2:47
              </div>
              
              {/* Video info overlay */}
              <div style={{
                position: 'absolute' as const,
                bottom: '16px',
                left: '16px',
                right: '16px',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: '#ffffff',
                padding: '8px 12px',
                borderRadius: '4px',
                fontSize: '12px',
                textAlign: 'center' as const
              }}>
                Click to view {referrerName}'s video endorsement
              </div>
            </a>
          )}
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
          flexWrap: 'wrap'
        }}>
          {resumeFile && (
            <a href={`/referral/${referralId}/resume`} style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#dc2626',
              color: '#ffffff',
              padding: '8px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              textDecoration: 'none',
              fontWeight: '600',
              minWidth: '120px'
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '6px' }}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" fill="none" stroke="currentColor" strokeWidth="2"/>
                <polyline points="14,2 14,8 20,8" fill="none" stroke="currentColor" strokeWidth="2"/>
                <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2"/>
                <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2"/>
                <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Resume
            </a>
          )}
          {linkedinUrl && (
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0077b5',
              color: '#ffffff',
              padding: '8px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              textDecoration: 'none',
              fontWeight: '600',
              minWidth: '120px'
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '6px' }}>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/>
              </svg>
              LinkedIn
            </a>
          )}
          {portfolioUrl && (
            <a href={portfolioUrl} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#059669',
              color: '#ffffff',
              padding: '8px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              textDecoration: 'none',
              fontWeight: '600',
              minWidth: '120px'
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '6px' }}>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="2" fill="none"/>
                <polyline points="15,3 21,3 21,9" stroke="currentColor" strokeWidth="2" fill="none"/>
                <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeWidth="2"/>
              </svg>
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
