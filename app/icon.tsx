import { ImageResponse } from 'next/og'

// Route segment config

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
            // ImageResponse JSX element
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
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        background: '#050505',
                        border: '2px solid #00f0ff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 8px #00f0ff',
                        overflow: 'hidden'
                    }}
                >
                    {/* Brillo superior simulado */}
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
                        height: '4px',
                        background: '#050505',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div style={{
                            width: '100%',
                            height: '2px',
                            background: '#00f0ff',
                            boxShadow: '0 0 4px #00f0ff'
                        }} />
                    </div>

                    {/* Centro */}
                    <div style={{
                        position: 'absolute',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: '#050505',
                        border: '2px solid #00f0ff',
                        boxShadow: '0 0 4px #00f0ff',
                        zIndex: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {/* Punto interior */}
                        <div style={{
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            background: '#00f0ff',
                            boxShadow: '0 0 4px #00f0ff',
                        }} />
                    </div>
                </div>
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    )
}
