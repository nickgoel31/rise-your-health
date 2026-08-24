import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      goal,
      goalTitle,
      timeline,
      timelineLabel,
      methods,
      preferredSlot,
      notes,
    } = body;

    // Validation
    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Full name, email, and phone number are required." },
        { status: 400 }
      );
    }

    const payload = {
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      fullName,
      email,
      phone,
      primaryGoal: goalTitle || goal || "Not specified",
      symptomTimeline: timelineLabel || timeline || "Not specified",
      previousMethods: Array.isArray(methods) ? methods.join(", ") : methods || "None",
      preferredSlot: preferredSlot || "Flexible",
      notes: notes || "None provided",
    };

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } catch (webhookError) {
        console.error("Error sending booking to Google Sheets webhook:", webhookError);
      }
    } else {
      console.log("No GOOGLE_SHEETS_WEBHOOK_URL environment variable set. Booking data payload:", payload);
    }

    return NextResponse.json({
      success: true,
      message: "Consultation assessment received successfully.",
    });
  } catch (error) {
    console.error("Booking API Error:", error);
    return NextResponse.json(
      { error: "Failed to process booking submission." },
      { status: 500 }
    );
  }
}
