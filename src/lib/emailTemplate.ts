
interface EmailTemplateData {
  referrerName: string;
  candidateName: string;
  position: string;
  referralId: string;
  resumeFile?: any;
  linkedinUrl?: string;
  portfolioUrl?: string;
  endorsementText?: string;
  recipientName?: string;
  videoFile?: any;
}

export function generateEmailHTML(data: EmailTemplateData): string {
  const {
    referrerName,
    candidateName,
    position,
    referralId,
    resumeFile,
    linkedinUrl,
    portfolioUrl,
    endorsementText,
    recipientName = 'there',
    videoFile
  } = data;

  const landingPageUrl = `https://referiq.netlify.app/referral/${referralId}`;
  // Use the Supabase storage URL for the video thumbnail
  const videoThumbnailUrl = videoFile ? `https://tvmmppyvqiqfgefsoamb.supabase.co/storage/v1/object/public/email-assets/video-thumbnail.jpg` : null;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Referral from ${referrerName}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header with Logo -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <div style="background-color: white; padding: 12px 24px; border-radius: 8px; display: inline-block;">
                <h1 style="margin: 0; font-size: 24px; font-weight: bold; color: #667eea;">ReferIQ</h1>
            </div>
        </div>

        <!-- Main Content -->
        <div style="padding: 32px 24px;">
            <h2 style="color: #1f2937; font-size: 24px; font-weight: bold; margin-bottom: 16px;">
                Hi ${recipientName},
            </h2>
            
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                I hope this email finds you well. I'm excited to refer <strong>${candidateName}</strong> for the <strong>${position}</strong> position at your company.
            </p>

            ${videoFile && videoThumbnailUrl ? `
            <!-- Video Thumbnail Section -->
            <div style="margin: 24px 0; text-align: center;">
                <h3 style="color: #1f2937; font-size: 18px; font-weight: 600; margin-bottom: 16px;">
                    📹 Personal Video Message
                </h3>
                <div style="position: relative; display: inline-block;">
                    <a href="${landingPageUrl}" style="display: block; position: relative;">
                        <img src="${videoThumbnailUrl}" alt="Video message from ${candidateName}" style="width: 100%; max-width: 400px; height: auto; border-radius: 8px; border: 2px solid #e5e7eb;">
                        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: rgba(0, 0, 0, 0.7); border-radius: 50%; padding: 16px;">
                            <div style="width: 0; height: 0; border-left: 20px solid white; border-top: 12px solid transparent; border-bottom: 12px solid transparent; margin-left: 4px;"></div>
                        </div>
                    </a>
                </div>
                <p style="color: #6b7280; font-size: 14px; margin-top: 8px;">
                    Click to watch ${candidateName}'s video message
                </p>
            </div>
            ` : ''}

            <!-- Endorsement Section -->
            ${endorsementText ? `
            <div style="background-color: #f9fafb; border-left: 4px solid #667eea; padding: 16px; margin: 24px 0; border-radius: 4px;">
                <h3 style="color: #1f2937; font-size: 16px; font-weight: 600; margin-bottom: 8px;">
                    My Endorsement:
                </h3>
                <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0; font-style: italic;">
                    "${endorsementText}"
                </p>
            </div>
            ` : ''}

            <!-- Action Buttons -->
            <div style="margin: 32px 0; text-align: center;">
                <h3 style="color: #1f2937; font-size: 18px; font-weight: 600; margin-bottom: 16px;">
                    Learn More About ${candidateName}
                </h3>
                <div style="display: inline-block; text-align: center;">
                    ${resumeFile ? `
                    <a href="${landingPageUrl}" style="display: inline-block; background-color: #dc2626; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 16px; font-weight: 500; margin: 8px;">
                        📄 View Resume
                    </a>
                    ` : ''}
                    ${linkedinUrl ? `
                    <a href="${linkedinUrl}" style="display: inline-block; background-color: #0077b5; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 16px; font-weight: 500; margin: 8px;">
                        💼 LinkedIn Profile
                    </a>
                    ` : ''}
                    ${portfolioUrl ? `
                    <a href="${portfolioUrl}" style="display: inline-block; background-color: #059669; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 16px; font-weight: 500; margin: 8px;">
                        🔗 Portfolio
                    </a>
                    ` : ''}
                </div>
            </div>

            <!-- CTA Section -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; padding: 24px; text-align: center; margin: 32px 0;">
                <h3 style="color: #ffffff; font-size: 20px; font-weight: bold; margin-bottom: 12px;">
                    Complete Candidate Profile
                </h3>
                <p style="color: #e5e7eb; font-size: 16px; margin-bottom: 20px;">
                    View the full referral package with AI insights and analysis
                </p>
                <a href="${landingPageUrl}" style="display: inline-block; background-color: #ffffff; color: #667eea; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-size: 16px; font-weight: 600;">
                    View Full Profile →
                </a>
            </div>

            <!-- Closing -->
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 8px;">
                I believe ${candidateName} would be an excellent addition to your team. Please let me know if you have any questions or would like to discuss this referral further.
            </p>
            
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                Best regards,<br>
                <strong>${referrerName}</strong>
            </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f9fafb; padding: 20px 24px; text-align: center; border-top: 1px solid #e5e7eb;">
            <div style="margin-bottom: 12px;">
                <h4 style="margin: 0; font-size: 16px; font-weight: bold; color: #667eea;">ReferIQ</h4>
            </div>
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
                Powered by AI-driven referral insights
            </p>
        </div>
    </div>
</body>
</html>
  `.trim();
}
