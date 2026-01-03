import { NextRequest, NextResponse } from "next/server";

// Cloudinary upload API route
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Convert file to base64
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64Data = buffer.toString("base64");
        const dataUri = `data:${file.type};base64,${base64Data}`;

        // Upload to Cloudinary
        const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
        const apiKey = process.env.CLOUDINARY_API_KEY;
        const apiSecret = process.env.CLOUDINARY_API_SECRET;

        if (!cloudName || !apiKey || !apiSecret) {
            return NextResponse.json({ error: "Cloudinary credentials not configured" }, { status: 500 });
        }

        const timestamp = Math.round(new Date().getTime() / 1000);
        const signature = await generateSignature(timestamp, apiSecret);

        const cloudinaryFormData = new FormData();
        cloudinaryFormData.append("file", dataUri);
        cloudinaryFormData.append("api_key", apiKey);
        cloudinaryFormData.append("timestamp", timestamp.toString());
        cloudinaryFormData.append("signature", signature);
        cloudinaryFormData.append("folder", "redwood-cms");

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
                method: "POST",
                body: cloudinaryFormData,
            }
        );

        const result = await response.json();

        if (result.error) {
            return NextResponse.json({ error: result.error.message }, { status: 400 });
        }

        return NextResponse.json({
            url: result.secure_url,
            publicId: result.public_id,
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}

// Generate Cloudinary signature
async function generateSignature(timestamp: number, apiSecret: string): Promise<string> {
    const message = `folder=redwood-cms&timestamp=${timestamp}${apiSecret}`;

    // Use Web Crypto API for SHA-1 hash
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-1", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

    return hashHex;
}
