import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = {
    width: 180,
    height: 180,
}
export const contentType = 'image/png'

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent',
                }}
            >
                <div
                    style={{
                        position: 'relative',
                        width: '180px',
                        height: '180px',
                        borderRadius: '50%',
                        background: '#050505',
                        border: '8px solid #00f0ff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 40px #00f0ff',
                        overflow: 'hidden'
                    }}
                >
                    {/* Brillo superior simulado escalado */}
                    <div style={{
                        position: 'absolute',
                        top: '0',
                        left: '25%',
                        width: '50%',
                        height: '50%',
                        background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)',
                        borderRadius: '50%',
                        opacity: 0.5
                    }} />

                    {/* Linea horizontal */}
                    <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '24px',
                        background: '#050505',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div style={{
                            width: '100%',
                            height: '12px',
                            background: '#00f0ff',
                            boxShadow: '0 0 20px #00f0ff'
                        }} />
                    </div>

                    {/* Centro */}
                    <div style={{
                        position: 'absolute',
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: '#050505',
                        border: '8px solid #00f0ff',
                        boxShadow: '0 0 20px #00f0ff',
                        zIndex: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {/* Punto interior */}
                        <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: '#00f0ff',
                            boxShadow: '0 0 20px #00f0ff',
                        }} />
                    </div>
                </div>
            </div>
        ),
        { ...size }
    )
}
