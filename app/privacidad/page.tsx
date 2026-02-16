import { Shield, Eye, Lock, Database, Bell, UserCheck, Globe, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PrivacidadPage() {
    const sections = [
        {
            icon: Database,
            title: "1. Información que Recopilamos",
            content: [
                "**Datos de registro:** Nombre de usuario, correo electrónico y contraseña encriptada al crear tu cuenta de entrenador.",
                "**Datos de colección:** Información sobre las cartas que añades, compras, vendes o subastas en la plataforma.",
                "**Datos de transacciones:** Historial de compras, ventas, pujas y movimientos de billetera.",
                "**Datos de navegación:** Cookies, dirección IP, tipo de navegador y dispositivo para mejorar tu experiencia.",
                "**Datos opcionales:** Foto de perfil, biografía y preferencias de notificación que tú decides compartir.",
            ],
        },
        {
            icon: Eye,
            title: "2. Cómo Utilizamos tu Información",
            content: [
                "Gestionar tu cuenta y perfil de coleccionista en PokéNexus.",
                "Procesar transacciones de compra, venta y subasta de cartas Pokémon TCG.",
                "Personalizar tu experiencia mostrando recomendaciones basadas en tu colección.",
                "Enviar notificaciones relevantes sobre subastas, ventas y actualizaciones de la plataforma.",
                "Mejorar la seguridad y prevenir fraude en todas las transacciones.",
                "Generar estadísticas anónimas para mejorar nuestros servicios.",
            ],
        },
        {
            icon: Lock,
            title: "3. Protección de Datos",
            content: [
                "Todas las contraseñas son encriptadas con algoritmos de hash seguros (bcrypt).",
                "Las transacciones financieras se procesan a través de proveedores de pago certificados con encriptación SSL/TLS.",
                "Implementamos medidas de seguridad contra accesos no autorizados, alteración o destrucción de datos.",
                "Realizamos auditorías de seguridad periódicas para mantener la integridad de la plataforma.",
                "El acceso a datos personales está restringido exclusivamente al personal autorizado.",
            ],
        },
        {
            icon: UserCheck,
            title: "4. Tus Derechos",
            content: [
                "**Acceso:** Puedes solicitar una copia de todos los datos personales que tenemos sobre ti.",
                "**Rectificación:** Puedes actualizar o corregir tu información personal en cualquier momento desde Configuración.",
                "**Eliminación:** Puedes solicitar la eliminación de tu cuenta y datos asociados.",
                "**Portabilidad:** Puedes exportar tu colección y datos en formato compatible.",
                "**Oposición:** Puedes oponerte al procesamiento de tus datos para fines de marketing.",
            ],
        },
        {
            icon: Bell,
            title: "5. Comunicaciones",
            content: [
                "Te enviaremos notificaciones sobre actividad de subastas en las que participas.",
                "Puedes recibir alertas de precio para cartas en tu lista de seguimiento.",
                "Las comunicaciones de marketing son opcionales y puedes desactivarlas en Configuración.",
                "Los avisos de seguridad y cambios en los términos siempre serán enviados por correo electrónico.",
            ],
        },
        {
            icon: Globe,
            title: "6. Cookies y Tecnologías",
            content: [
                "**Cookies esenciales:** Necesarias para el funcionamiento de la plataforma (inicio de sesión, carrito).",
                "**Cookies de rendimiento:** Nos ayudan a entender cómo usas PokéNexus para mejorar la experiencia.",
                "**Cookies de funcionalidad:** Recuerdan tus preferencias (idioma, tema, filtros guardados).",
                "Puedes gestionar las cookies desde la configuración de tu navegador en cualquier momento.",
            ],
        },
    ];

    return (
        <main className="min-h-screen bg-nexus pb-20">
            {/* Hero */}
            <section className="relative pt-32 pb-16 px-6 overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[50%] bg-green-500/5 blur-[180px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[35%] h-[40%] bg-primary/5 blur-[150px] rounded-full" />

                <img
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/282.png"
                    alt=""
                    className="absolute top-20 right-[5%] w-52 h-52 opacity-[0.04] hidden lg:block"
                />

                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
                        <Shield className="w-4 h-4 text-green-400" />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-green-400">Protección de Datos</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black font-display mb-6 leading-tight tracking-tight">
                        POLÍTICA DE <br />
                        <span className="text-holographic animate-shimmer">PRIVACIDAD</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
                        En PokéNexus, proteger la información de nuestros entrenadores es una prioridad absoluta. Esta política describe cómo recopilamos, utilizamos y protegemos tus datos.
                    </p>
                    <p className="text-sm text-gray-600 mt-4">
                        Última actualización: 16 de Febrero de 2026
                    </p>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-6 space-y-8">
                {sections.map((section, i) => (
                    <section
                        key={i}
                        className="bg-surface/60 backdrop-blur-xl border border-white/10 rounded-[28px] p-8 hover:border-white/15 transition-all"
                    >
                        <h2 className="text-xl font-black mb-6 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                                <section.icon className="w-5 h-5 text-green-400" />
                            </div>
                            {section.title}
                        </h2>
                        <ul className="space-y-4">
                            {section.content.map((item, j) => (
                                <li key={j} className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-2 shrink-0" />
                                    <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>') }} />
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}

                {/* Contact */}
                <section className="relative rounded-[32px] bg-surface/60 backdrop-blur-xl border border-white/10 p-10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-primary/5 pointer-events-none" />
                    <img
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/468.png"
                        alt=""
                        className="absolute bottom-4 right-8 w-28 h-28 opacity-[0.06]"
                    />
                    <div className="relative z-10">
                        <h3 className="text-xl font-black mb-3 flex items-center gap-3">
                            <FileText className="w-5 h-5 text-primary" />
                            ¿Tienes Preguntas?
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xl">
                            Si tienes dudas sobre cómo tratamos tus datos o quieres ejercer cualquiera de tus derechos, no dudes en contactarnos a través de la comunidad o por correo electrónico.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/community"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-nexus font-black uppercase tracking-widest text-xs rounded-xl hover:bg-primary/80 transition-all shadow-lg shadow-primary/20"
                            >
                                Ir a la Comunidad
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/terminos"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all"
                            >
                                Ver Términos
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
