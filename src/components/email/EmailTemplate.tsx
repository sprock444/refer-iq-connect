
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
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        padding: '24px',
        textAlign: 'center' as const
      }}>
        <h1 style={{
          color: '#ffffff',
          fontSize: '24px',
          fontWeight: 'bold',
          margin: '0 0 8px 0'
        }}>
          ReferIQ
        </h1>
        <p style={{
          color: '#e0e7ff',
          fontSize: '14px',
          margin: '0'
        }}>
          Reinventing Employee Referrals
        </p>
      </div>

      {/* Main Content */}
      <div style={{ padding: '24px' }}>
        <p style={{
          fontSize: '16px',
          color: '#374151',
          margin: '0 0 24px 0'
        }}>
          Hi there,
        </p>

        <p style={{
          fontSize: '16px',
          color: '#374151',
          margin: '0 0 24px 0'
        }}>
          Great news! You have a new referral that's ready for review with a compelling video introduction.
        </p>

        {/* Candidate Card */}
        <div style={{
          backgroundColor: '#f9fafb',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          border: '1px solid #e5e7eb'
        }}>
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
              backgroundColor: '#6366f1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '16px'
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
                margin: '0 0 4px 0'
              }}>
                {candidateName}
              </h2>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                margin: '0'
              }}>
                {position}
              </p>
              <p style={{
                fontSize: '12px',
                color: '#8b5cf6',
                margin: '4px 0 0 0'
              }}>
                Referred by: {referrerName} ({relationship})
              </p>
            </div>
          </div>

          {/* Video Section */}
          {videoFile && (
            <div style={{
              backgroundColor: '#1f2937',
              borderRadius: '8px',
              padding: '40px',
              textAlign: 'center' as const,
              marginBottom: '24px',
              position: 'relative' as const
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}>
                <Play style={{ color: '#6366f1', width: '24px', height: '24px' }} />
              </div>
              <p style={{
                position: 'absolute' as const,
                bottom: '12px',
                left: '12px',
                color: '#ffffff',
                fontSize: '12px',
                margin: '0'
              }}>
                1:23
              </p>
            </div>
          )}

          {/* Endorsement Quote */}
          {endorsementText && (
            <div style={{
              borderLeft: '4px solid #e5e7eb',
              paddingLeft: '16px',
              marginBottom: '24px'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#4b5563',
                fontStyle: 'italic',
                margin: '0 0 8px 0'
              }}>
                "{endorsementText}"
              </p>
            </div>
          )}

          {/* AI Insights Scores */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '24px',
            textAlign: 'center' as const
          }}>
            <div>
              <div style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#059669',
                margin: '0'
              }}>
                {aiInsights.roleFit}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#6b7280',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.5px'
              }}>
                ROLE FIT
              </div>
            </div>
            <div>
              <div style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#059669',
                margin: '0'
              }}>
                {aiInsights.culturalFit}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#6b7280',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.5px'
              }}>
                CULTURAL FIT
              </div>
            </div>
            <div>
              <div style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#059669',
                margin: '0'
              }}>
                {aiInsights.authenticity}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#6b7280',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.5px'
              }}>
                AUTHENTICITY
              </div>
            </div>
          </div>

          {/* Attachments */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '24px',
            flexWrap: 'wrap' as const
          }}>
            {linkedinUrl && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: '#0077b5',
                color: '#ffffff',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                textDecoration: 'none'
              }}>
                <Linkedin style={{ width: '14px', height: '14px', marginRight: '6px' }} />
                LinkedIn Profile
              </div>
            )}
            {resumeFile && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: '#dc2626',
                color: '#ffffff',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '12px'
              }}>
                <FileText style={{ width: '14px', height: '14px', marginRight: '6px' }} />
                Resume (PDF)
              </div>
            )}
            {portfolioUrl && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: '#059669',
                color: '#ffffff',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '12px'
              }}>
                <ExternalLink style={{ width: '14px', height: '14px', marginRight: '6px' }} />
                Portfolio Site
              </div>
            )}
          </div>

          {/* Skills/Tags */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '16px',
            flexWrap: 'wrap' as const
          }}>
            {['Technical Depth', 'Team Player', 'Creative Problem Solver', 'Mentorship'].map((skill) => (
              <span key={skill} style={{
                backgroundColor: '#e0e7ff',
                color: '#3730a3',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '11px'
              }}>
                {skill}
              </span>
            ))}
          </div>

          {/* Referrer Quote */}
          <div style={{
            borderLeft: '4px solid #f59e0b',
            paddingLeft: '16px',
            backgroundColor: '#fffbeb',
            padding: '16px',
            borderRadius: '4px',
            marginBottom: '16px'
          }}>
            <p style={{
              fontSize: '14px',
              color: '#92400e',
              fontStyle: 'italic',
              margin: '0 0 8px 0'
            }}>
              "{candidateName} is one of the most talented developers I've worked with. They consistently deliver high-quality code while mentoring junior developers. Perfect cultural fit for our collaborative environment."
            </p>
            <p style={{
              fontSize: '12px',
              color: '#92400e',
              margin: '0',
              fontWeight: 'bold'
            }}>
              — {referrerName}, Senior Engineering Manager
            </p>
          </div>
        </div>

        {/* AI Insights */}
        <div style={{
          backgroundColor: '#f0f9ff',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '24px',
          border: '1px solid #bae6fd'
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#0c4a6e',
            margin: '0 0 8px 0'
          }}>
            AI Insights:
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#0c4a6e',
            margin: '0',
            lineHeight: '1.5'
          }}>
            {aiInsights.summary}
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px'
        }}>
          <a href="#" style={{
            backgroundColor: '#6366f1',
            color: '#ffffff',
            padding: '12px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            Review Full Profile
          </a>
          <a href="#" style={{
            backgroundColor: '#ffffff',
            color: '#6366f1',
            padding: '12px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '14px',
            border: '2px solid #6366f1'
          }}>
            Schedule Interview
          </a>
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#111827',
            margin: '0 0 12px 0'
          }}>
            Quick Actions:
          </h4>
          <ul style={{
            fontSize: '14px',
            color: '#6366f1',
            margin: '0',
            paddingLeft: '20px'
          }}>
            <li><a href="#" style={{ color: '#6366f1' }}>Move to Interview Pool</a></li>
            <li><a href="#" style={{ color: '#6366f1' }}>Send to Hiring Manager</a></li>
            <li><a href="#" style={{ color: '#6366f1' }}>Request Technical Assessment</a></li>
            <li><a href="#" style={{ color: '#6366f1' }}>Share with Team</a></li>
          </ul>
        </div>

        {/* Footer */}
        <div style={{
          borderTop: '1px solid #e5e7eb',
          paddingTop: '16px',
          fontSize: '12px',
          color: '#6b7280'
        }}>
          <p style={{ margin: '0 0 4px 0' }}>
            This referral expires in 7 days if no action is taken.
          </p>
          <p style={{ margin: '0' }}>
            Need help? <a href="#" style={{ color: '#6366f1' }}>Contact Support</a> | <a href="#" style={{ color: '#6366f1' }}>View in Dashboard</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplate;
