import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SendEmailRequest {
  referralId: string;
  recipientEmail: string;
  recipientName?: string;
  htmlContent: string;
  subject: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { referralId, recipientEmail, recipientName, htmlContent, subject }: SendEmailRequest = await req.json();

    console.log("Sending email for referral:", referralId);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // For testing: override recipient to verified email
    // Remove this line when domain is verified in production
    const testEmail = "jason.sprawka@gmail.com";
    const finalRecipientEmail = testEmail; // Change back to recipientEmail when domain verified
    
    console.log(`Sending to: ${finalRecipientEmail} (original: ${recipientEmail})`);

    // Send email via Resend
    const emailResponse = await resend.emails.send({
      from: "Referrals <onboarding@resend.dev>",
      to: [finalRecipientEmail],
      subject: "You have a Referral from Jason Sprawka",
      html: htmlContent,
    });

    console.log("Email sent successfully:", emailResponse);

    // Update referral status in database
    const { error: updateError } = await supabase
      .from('referrals')
      .update({ 
        status: 'sent',
        updated_at: new Date().toISOString()
      })
      .eq('id', referralId);

    if (updateError) {
      console.error("Error updating referral status:", updateError);
      throw updateError;
    }

    return new Response(JSON.stringify({ 
      success: true, 
      messageId: emailResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);