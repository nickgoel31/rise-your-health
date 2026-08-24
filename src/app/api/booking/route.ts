import { NextResponse } from "next/server";

const DEFAULT_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbyRJ0tDpKcIIJgLZtGY7oM8xzar9eWD6Fi-M8m7XLwn9PJmTFXWF_4FHRGhO0TIAB4P/exec";

function validateIndianPhone(phone: string): { isValid: boolean; formatted: string } {
  const cleaned = phone.trim().replace(/[\s\-()]/g, "");
  const indianMobileRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;

  if (!indianMobileRegex.test(cleaned)) {
    return { isValid: false, formatted: phone };
  }

  const match = cleaned.match(/([6-9]\d{9})$/);
  const core10 = match ? match[1] : cleaned;
  const formatted = `+91 ${core10.slice(0, 5)} ${core10.slice(5)}`;

  return { isValid: true, formatted };
}

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

    const phoneValidation = validateIndianPhone(phone);
    if (!phoneValidation.isValid) {
      return NextResponse.json(
        { error: "Please provide a valid 10-digit Indian mobile number (e.g. 98765 43210 or +91 98765 43210)." },
        { status: 400 }
      );
    }

    const payload = {
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phoneValidation.formatted,
      primaryGoal: goalTitle || goal || "Not specified",
      symptomTimeline: timelineLabel || timeline || "Not specified",
      previousMethods: Array.isArray(methods) ? methods.join(", ") : methods || "None",
      preferredSlot: preferredSlot || "Flexible",
      notes: notes ? notes.trim() : "None provided",
    };

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL || DEFAULT_WEBHOOK_URL;

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
