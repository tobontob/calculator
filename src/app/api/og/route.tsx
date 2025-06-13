import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <h1
              style={{
                fontSize: '60px',
                fontWeight: 'bold',
                color: '#1a1a1a',
                marginBottom: '20px',
              }}
            >
              Calculator Hub
            </h1>
            <p
              style={{
                fontSize: '32px',
                color: '#4a4a4a',
                marginBottom: '40px',
              }}
            >
              다양한 계산기 모음
            </p>
            <div
              style={{
                display: 'flex',
                gap: '20px',
                marginTop: '20px',
              }}
            >
              <div
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#0070f3',
                  color: 'white',
                  borderRadius: '8px',
                  fontSize: '24px',
                }}
              >
                환율 계산기
              </div>
              <div
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#0070f3',
                  color: 'white',
                  borderRadius: '8px',
                  fontSize: '24px',
                }}
              >
                대출 계산기
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
} 