import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 16,
                    background: '#0f0f0f',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    borderRadius: '8px', // Slightly rounded square, modern standard
                    fontFamily: 'sans-serif',
                    letterSpacing: '-1px',
                }}
            >
                {/* White "A" */}
                <div style={{ color: '#ffffff' }}>A</div>
                {/* Orange "T" */}
                <div style={{ color: '#ff9f43' }}>T</div>
            </div>
        ),
        { ...size }
    )
}
