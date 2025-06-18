
import React from 'react';
import { Play, ExternalLink, FileText, Linkedin, User } from 'lucide-react';

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
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb'
    }}>
      {/* Compact Header */}
      <div style={{
        background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: 'bold'
          }}>R</span>
        </div>
        <div>
          <h1 style={{
            color: '#ffffff',
            fontSize: '18px',
            fontWeight: 'bold',
            margin: '0'
          }}>ReferIQ</h1>
          <p style={{
            color: '#dbeafe',
            fontSize: '12px',
            margin: '0'
          }}>New Referral Ready for Review</p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '20px 24px' }}>
        {/* Candidate Header with Video Priority */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '16px',
          marginBottom: '20px'
        }}>
          {/* Video Section - Priority Placement */}
          <div style={{ flex: '0 0 200px' }}>
            {videoFile && (
              <div style={{
                backgroundColor: '#1f2937',
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'center' as const,
                position: 'relative' as const,
                cursor: 'pointer'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px'
                }}>
                  <Play style={{ color: '#2563eb', width: '20px', height: '20px' }} />
                </div>
                <p style={{
                  color: '#ffffff',
                  fontSize: '11px',
                  margin: '0',
                  fontWeight: 'bold'
                }}>
                  Watch Endorsement
                </p>
                <p style={{
                  position: 'absolute' as const,
                  bottom: '8px',
                  right: '8px',
                  color: '#ffffff',
                  fontSize: '10px',
                  margin: '0'
                }}>
                  1:23
                </p>
              </div>
            )}
          </div>

          {/* Candidate Info */}
          <div style={{ flex: '1' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px'
              }}>
                <span style={{
                  color: '#ffffff',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}>
                  {candidateName.split(' ').map(n => n[0]).join('').toUpperCase()}
                </span>
              </div>
              <div>
                <h2 style={{
                  fontSize: '18px',
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
                  fontSize: '11px',
                  color: '#2563eb',
                  margin: '0'
                }}>
                  Referred by: {referrerName}
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '12px'
            }}>
              {resumeFile && (
                <a href="#resume-download" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  padding: '6px 10px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}>
                  <FileText style={{ width: '12px', height: '12px', marginRight: '4px' }} />
                  Resume
                </a>
              )}
              {linkedinUrl && (
                <a href={linkedinUrl} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: '#0077b5',
                  color: '#ffffff',
                  padding: '6px 10px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}>
                  <Linkedin style={{ width: '12px', height: '12px', marginRight: '4px' }} />
                  LinkedIn
                </a>
              )}
              {portfolioUrl && (
                <a href={portfolioUrl} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: '#059669',
                  color: '#ffffff',
                  padding: '6px 10px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}>
                  <ExternalLink style={{ width: '12px', height: '12px', marginRight: '4px' }} />
                  Portfolio
                </a>
              )}
            </div>
          </div>
        </div>

        {/* AI Insights Scores - Compact */}
        <div style={{
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '16px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{
            fontSize: '13px',
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
                fontSize: '24px',
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
                fontSize: '24px',
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
                fontSize: '24px',
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
            borderLeft: '3px solid #2563eb',
            paddingLeft: '12px',
            marginBottom: '16px',
            backgroundColor: '#eff6ff',
            padding: '12px',
            borderRadius: '4px'
          }}>
            <p style={{
              fontSize: '13px',
              color: '#1e40af',
              fontStyle: 'italic',
              margin: '0 0 6px 0',
              lineHeight: '1.4'
            }}>
              "{endorsementText}"
            </p>
            <p style={{
              fontSize: '11px',
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
            padding: '10px 20px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '13px',
            flex: '1',
            textAlign: 'center' as const
          }}>
            Review Full Profile
          </a>
          <a href="#" style={{
            backgroundColor: '#ffffff',
            color: '#2563eb',
            padding: '10px 20px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '13px',
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
          paddingTop: '12px',
          fontSize: '11px',
          color: '#6b7280',
          textAlign: 'center' as const
        }}>
          <p style={{ margin: '0 0 4px 0' }}>
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
