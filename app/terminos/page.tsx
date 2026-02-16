import { FileText, Users, ShoppingCart, Gavel, AlertTriangle, Scale, Ban, ArrowRight, Shield, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function TerminosPage() {
    const sections = [
        {
            icon: Users,
            title: "1. Aceptación de los Términos",
            content: [
                "Al acceder y utilizar PokéNexus, aceptas estos Términos y Condiciones en su totalidad.",
                "Si no estás de acuerdo con alguno de estos términos, te pedimos que no utilices la plataforma.",
                "PokéNexus se reserva el derecho de modificar estos términos. Los cambios serán notificados por correo electrónico y entrarán en vigor 30 días después de su publicación.",
                "El uso continuado de la plataforma después de la notificación constituye la aceptación de los términos modificados.",
            ],
        },
        {
            icon: Users,
            title: "2. Registro y Cuenta",
            content: [
                "Debes tener al menos 18 años de edad o contar con el consentimiento de un tutor legal para crear una cuenta.",
                "Eres responsable de mantener la confidencialidad de tu contraseña y la seguridad de tu cuenta.",
                "La información proporcionada durante el registro debe ser veraz y actualizada.",
                "Cada persona física puede mantener únicamente una cuenta activa en PokéNexus.",
                "PokéNexus se reserva el derecho de suspender o eliminar cuentas que violen estos términos.",
            ],
        },
        {
            icon: ShoppingCart,
            title: "3. Compra y Venta de Cartas",
            content: [
                "Los vendedores garantizan que las cartas listadas son auténticas, están en la condición descrita y son de su legítima propiedad.",
                "Los precios están expresados en pesos mexicanos (MXN) salvo que se indique lo contrario.",
                "PokéNexus actúa como intermediario y no es responsable de la condición física de las cartas.",
                "Los vendedores deben enviar las cartas dentro de los 3 días hábiles posteriores a la confirmación de la venta.",
                "Las disputas entre compradores y vendedores serán mediadas por el equipo de PokéNexus con imparcialidad.",
                "PokéNexus puede cobrar una comisión por cada transacción exitosa, la cual será mostrada antes de confirmar."
            ],
        },
        {
            icon: Gavel,
            title: "4. Sistema de Subastas",
            content: [
                "Las pujas son vinculantes. Al realizar una puja, te comprometes a completar la compra si resultas ganador.",
                "Las pujas no pueden ser retiradas una vez realizadas, salvo error manifiesto verificado por el equipo.",
                "El vendedor establece el precio de inicio, duración y condiciones de la subasta.",
                "PokéNexus se reserva el derecho de cancelar subastas que no cumplan con las políticas de la plataforma.",
                "En caso de empate en el precio, prevalecerá la puja realizada primero cronológicamente.",
                "El ganador tiene 48 horas para completar el pago. De no hacerlo, la carta se reofrece al siguiente postor.",
            ],
        },
        {
            icon: Scale,
            title: "5. Responsabilidades del Usuario",
            content: [
                "Mantener la información de tu cuenta actualizada y precisa.",
                "No utilizar la plataforma para actividades fraudulentas, engañosas o ilegales.",
                "Respetar a otros miembros de la comunidad en todas las interacciones.",
                "No manipular precios, crear cuentas falsas ni interferir con el funcionamiento normal del sistema.",
                "Reportar cualquier actividad sospechosa o violación de los términos al equipo de PokéNexus.",
                "Cumplir con todas las leyes y regulaciones aplicables en tu jurisdicción.",
            ],
        },
        {
            icon: AlertTriangle,
            title: "6. Limitación de Responsabilidad",
            content: [
                "PokéNexus no garantiza la disponibilidad ininterrumpida del servicio y puede realizar mantenimientos programados.",
                "No somos responsables por pérdidas derivadas de fluctuaciones en el valor de las cartas.",
                "La plataforma se proporciona \"tal cual\" sin garantías de ningún tipo, ya sean expresas o implícitas.",
                "PokéNexus no es responsable por el contenido publicado por los usuarios ni por las acciones de terceros.",
                "Nuestra responsabilidad se limita al valor de la transacción en disputa.",
            ],
        },
        {
            icon: Ban,
            title: "7. Conducta Prohibida",
            content: [
                "Vender cartas falsificadas, reparadas sin declarar, o de procedencia ilícita.",
                "Manipular el sistema de reputación con reseñas falsas o transacciones ficticias.",
                "Realizar spam, phishing o cualquier tipo de comunicación no solicitada.",
                "Intentar acceder a cuentas de otros usuarios o a sistemas internos de PokéNexus.",
                "Usar bots, scripts o herramientas automatizadas no autorizadas.",
                "Publicar contenido ofensivo, discriminatorio o que viole derechos de propiedad intelectual.",
            ],
        },
    ];

    return (
        <main className="min-h-screen bg-nexus pb-20">
            {/* Hero */}
            <section className="relative pt-32 pb-16 px-6 overflow-hidden">
                <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[50%] bg-legendary/5 blur-[180px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[35%] h-[40%] bg-primary/5 blur-[150px] rounded-full" />

                <img
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/376.png"
                    alt=""
                    className="absolute top-20 right-[5%] w-52 h-52 opacity-[0.04] hidden lg:block"
                />

                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-legendary/10 border border-legendary/20 mb-6">
                        <FileText className="w-4 h-4 text-legendary" />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-legendary">Marco Legal</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black font-display mb-6 leading-tight tracking-tight">
                        TÉRMINOS Y <br />
                        <span className="text-holographic animate-shimmer">CONDICIONES</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
                        Estos términos establecen las reglas y directrices para el uso de PokéNexus. Al usar nuestra plataforma, aceptas cumplir con estas condiciones.
                    </p>
                    <p className="text-sm text-gray-600 mt-4">
                        Última actualización: 16 de Febrero de 2026
                    </p>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-6 space-y-8">
                {/* Quick Summary */}
                <section className="bg-gradient-to-br from-primary/5 to-legendary/5 rounded-[28px] border border-white/10 p-8">
                    <h2 className="text-lg font-black mb-4 flex items-center gap-3">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png" alt="" className="w-6 h-6" />
                        Resumen Rápido
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { text: "Sé honesto con tus listados", icon: CheckCircle },
                            { text: "Respeta a la comunidad", icon: Users },
                            { text: "Cumple con tus compromisos", icon: Shield },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                                <item.icon className="w-5 h-5 text-green-400 shrink-0" />
                                <span className="text-sm text-white font-bold">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {sections.map((section, i) => (
                    <section
                        key={i}
                        className="bg-surface/60 backdrop-blur-xl border border-white/10 rounded-[28px] p-8 hover:border-white/15 transition-all"
                    >
                        <h2 className="text-xl font-black mb-6 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-legendary/10 flex items-center justify-center shrink-0">
                                <section.icon className="w-5 h-5 text-legendary" />
                            </div>
                            {section.title}
                        </h2>
                        <ul className="space-y-4">
                            {section.content.map((item, j) => (
                                <li key={j} className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
                                    <div className="w-1.5 h-1.5 rounded-full bg-legendary/50 mt-2 shrink-0" />
                                    <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>') }} />
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}

                {/* Footer */}
                <section className="relative rounded-[32px] bg-surface/60 backdrop-blur-xl border border-white/10 p-10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-legendary/5 via-transparent to-primary/5 pointer-events-none" />
                    <img
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png"
                        alt=""
                        className="absolute bottom-4 right-8 w-28 h-28 opacity-[0.06]"
                    />
                    <div className="relative z-10">
                        <h3 className="text-xl font-black mb-3 flex items-center gap-3">
                            <Scale className="w-5 h-5 text-legendary" />
                            Jurisdicción y Ley Aplicable
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xl">
                            Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier disputa será sometida a los tribunales competentes de la Ciudad de México.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/privacidad"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all"
                            >
                                <Shield className="w-4 h-4" />
                                Ver Privacidad
                            </Link>
                            <Link
                                href="/nosotros"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all"
                            >
                                Sobre Nosotros
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
