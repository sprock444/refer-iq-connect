
import React from 'react';
import { Play, ExternalLink, FileText, Linkedin, User, Video } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import videoThumbnail from '@/assets/video-thumbnail.jpg';

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
        <img 
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzNiODJmNiIvPgo8cGF0aCBkPSJNMTAgOGw2IDQtNiA0VjhaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K" 
          alt="ReferIQ" 
          style={{
            width: '24px',
            height: '24px'
          }}
        />
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
            <a href={isLandingPage ? `/referral/${referralId}` : `https://referiq.netlify.app/referral/${referralId}`} style={{
              position: 'relative' as const,
              width: '100%',
              maxWidth: '480px',
              height: '270px',
              margin: '0 auto',
              borderRadius: '6px',
              overflow: 'hidden',
              cursor: 'pointer',
              backgroundImage: `url(${isLandingPage ? videoThumbnail : 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop&crop=face'})`,
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
                <span style={{
                  color: '#ffffff',
                  fontSize: '24px',
                  marginLeft: '3px'
                }}>▶</span>
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
                right: '80px',
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
            <a href={isLandingPage ? `/referral/${referralId}/resume` : `https://referiq.netlify.app/referral/${referralId}`} style={{
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
              <span style={{ marginRight: '6px', fontSize: '14px' }}>📄</span>
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
              <span style={{ marginRight: '6px', fontSize: '14px' }}>💼</span>
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
              <span style={{ marginRight: '6px', fontSize: '14px' }}>🌐</span>
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
          <a href={isLandingPage ? `/referral/${referralId}` : `https://referiq.netlify.app/referral/${referralId}`} style={{
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
          <a href={isLandingPage ? `/referral/${referralId}` : `https://referiq.netlify.app/referral/${referralId}`} style={{
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

// Email HTML generation function for actual email sending
export const generateEmailHTML = (props: {
  referrerName: string;
  candidateName: string;
  position: string;
  referralId: string;
  resumeFile?: any;
  portfolioUrl?: string;
  endorsementText?: string;
  recipientName?: string;
}) => {
  const {
    referrerName,
    candidateName,
    position,
    referralId,
    resumeFile,
    portfolioUrl,
    endorsementText,
    recipientName = 'there'
  } = props;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Referral from ${referrerName}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%); color: #ffffff; padding: 24px; text-align: center;">
            <div style="margin-bottom: 16px;">
                <div style="display: inline-flex; align-items: center; gap: 8px;">
                    <div style="width: 24px; height: 24px; background-color: #3b82f6; border-radius: 4px; position: relative;">
                        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 0; height: 0; border-left: 8px solid white; border-top: 5px solid transparent; border-bottom: 5px solid transparent; margin-left: 2px;"></div>
                    </div>
                    <span style="font-size: 20px; font-weight: 700; color: #ffffff;">ReferIQ</span>
                </div>
            </div>
            <h2 style="margin: 0; font-size: 24px; font-weight: 600;">You have a referral from ${referrerName}</h2>
            <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 16px;">A talented candidate for your consideration</p>
        </div>

        <!-- Main Content -->
        <div style="padding: 32px 24px;">
            
            <!-- Greeting -->
            <div style="margin-bottom: 24px;">
                <p style="color: #374151; font-size: 16px; line-height: 1.5; margin: 0;">Hi ${recipientName},</p>
                <p style="color: #374151; font-size: 16px; line-height: 1.5; margin: 12px 0 0 0;">
                    ${referrerName} thought you'd be interested in connecting with <strong>${candidateName}</strong>, a ${position}.
                </p>
            </div>

            <!-- Video Section -->
            <div style="margin-bottom: 24px; text-align: center;">
                <h3 style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">📹 Introduction Video</h3>
                <a href="https://referiq.netlify.app/referral/${referralId}" style="display: inline-block; text-decoration: none;">
                    <div style="position: relative; width: 100%; max-width: 480px; height: 270px; border-radius: 6px; overflow: hidden; background-image: url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop&crop=face'); background-size: cover; background-position: center; margin: 0 auto;">
                        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.3);"></div>
                        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 60px; height: 60px; background-color: rgba(37, 99, 235, 0.9); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <div style="width: 0; height: 0; border-left: 16px solid #ffffff; border-top: 10px solid transparent; border-bottom: 10px solid transparent; margin-left: 4px;"></div>
                        </div>
                        <div style="position: absolute; bottom: 12px; right: 12px; background-color: rgba(0, 0, 0, 0.8); color: #ffffff; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold;">2:47</div>
                    </div>
                </a>
                <p style="color: #6b7280; font-size: 14px; margin: 8px 0 0 0;">Click to watch ${candidateName}'s introduction</p>
            </div>

            <!-- Endorsement -->
            ${endorsementText ? `
            <div style="margin-bottom: 24px; padding: 20px; background-color: #eff6ff; border-left: 4px solid #2563eb; border-radius: 6px;">
                <h3 style="color: #111827; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">💬 Personal Endorsement</h3>
                <p style="color: #1e40af; font-size: 14px; line-height: 1.6; margin: 0; font-style: italic;">"${endorsementText}"</p>
                <p style="color: #1e40af; font-size: 12px; margin: 12px 0 0 0; font-weight: bold;">— ${referrerName}</p>
            </div>
            ` : ''}

            <!-- AI Analysis -->
            <div style="margin-bottom: 24px; padding: 16px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
                <h3 style="color: #1e293b; font-size: 14px; font-weight: 600; margin: 0 0 12px 0; text-align: center;">🤖 AI Analysis Results</h3>
                <div style="display: flex; justify-content: space-around; text-align: center;">
                    <div>
                        <div style="font-size: 24px; font-weight: bold; color: #059669; margin: 0;">92</div>
                        <div style="font-size: 10px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">ROLE FIT</div>
                    </div>
                    <div>
                        <div style="font-size: 24px; font-weight: bold; color: #059669; margin: 0;">87</div>
                        <div style="font-size: 10px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">CULTURAL FIT</div>
                    </div>
                    <div>
                        <div style="font-size: 24px; font-weight: bold; color: #059669; margin: 0;">94</div>
                        <div style="font-size: 10px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">AUTHENTICITY</div>
                    </div>
                </div>
            </div>

            <!-- Links -->
            <div style="margin-bottom: 32px;">
                <h3 style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">📋 Candidate Resources</h3>
                <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                    ${resumeFile ? `
                    <a href="https://referiq.netlify.app/referral/${referralId}" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; background-color: #dc2626; color: #ffffff; padding: 10px 16px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 500;">
                        📄 View Resume
                    </a>
                    ` : ''}
                    ${portfolioUrl ? `
                    <a href="https://referiq.netlify.app/referral/${referralId}" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; background-color: #059669; color: #ffffff; padding: 10px 16px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 500;">
                        🔗 View Portfolio
                    </a>
                    ` : ''}
                </div>
            </div>

            <!-- CTA Buttons -->
            <div style="display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap;">
                <a href="https://referiq.netlify.app/referral/${referralId}" style="background-color: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500; display: inline-block; flex: 1; text-align: center;">
                    Review Full Profile
                </a>
                <a href="https://referiq.netlify.app/referral/${referralId}" style="background-color: #ffffff; color: #2563eb; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500; border: 2px solid #2563eb; display: inline-block; flex: 1; text-align: center;">
                    Schedule Interview
                </a>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                <p style="color: #6b7280; font-size: 12px; margin: 0 0 6px 0;">
                    This referral expires in 7 days if no action is taken.
                </p>
                <p style="color: #6b7280; font-size: 12px; margin: 0;">
                    Powered by <a href="https://referiq.netlify.app" style="color: #2563eb; text-decoration: none;">ReferIQ</a>
                </p>
            </div>
        </div>
    </div>
</body>
</html>`;
};

export default EmailTemplate;
