"use client";

import { useState, useEffect, useTransition } from "react";
import {
  Lock,
  Users,
  DollarSign,
  TrendingUp,
  Search,
  RefreshCw,
  MessageSquare,
  ChevronRight,
  Filter,
  CheckCircle2,
  Clock,
  ShieldCheck,
  LogOut,
  X,
  AlertCircle,
  Mail,
  KeyRound,
  Database,
} from "lucide-react";

interface Lead {
  id: string;
  nombre: string;
  telefono: string;
  pais: string;
  interes: string;
  capital: string;
  urgencia: string;
  situacion: string;
  status: "Nuevo" | "Contactado" | "En Negociación" | "Cerrado";
  createdAt: string;
}

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeUserEmail, setActiveUserEmail] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [capitalFilter, setCapitalFilter] = useState("Todos");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [, startTransition] = useTransition();

  // Auto login if token saved in localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("admin_token");
    const savedEmail = localStorage.getItem("admin_email");
    if (savedToken) {
      setActiveUserEmail(savedEmail || "Administrador");
      fetchLeads(savedToken);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    if (!email.trim() || !password.trim()) {
      setAuthError("Por favor ingresa tu correo y contraseña.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setAuthError(data.message || "Credenciales incorrectas.");
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      // Success
      localStorage.setItem("admin_token", data.token);
      localStorage.setItem("admin_email", data.email);
      setActiveUserEmail(data.email);
      setIsAuthenticated(true);
      fetchLeads(data.token);
    } catch (err) {
      console.error(err);
      setAuthError("Error de conexión al iniciar sesión.");
      setLoading(false);
    }
  };

  const fetchLeads = async (token: string) => {
    setLoading(true);
    setAuthError("");
    setWarningMessage(null);

    try {
      const res = await fetch("/api/admin/leads", {
        headers: {
          "x-admin-key": token,
        },
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setAuthError(data.message || "Sesión expirada o no autorizada.");
        setIsAuthenticated(false);
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_email");
        setLoading(false);
        return;
      }

      // Token is valid!
      setIsAuthenticated(true);
      setLeads(data.leads || []);

      if (data.fallbackMode || data.warning) {
        setWarningMessage(
          data.warning || "Base de datos en espera de conexión o vacía. Los leads nuevos aparecerán aquí automáticamente."
        );
      }
    } catch (err) {
      console.error(err);
      setAuthError("Error al recuperar prospectos del servidor.");
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: Lead["status"]) => {
    const currentToken = localStorage.getItem("admin_token");
    if (!currentToken) return;

    // Optimistic UI update
    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead))
    );
    if (selectedLead?.id === leadId) {
      setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    try {
      await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": currentToken,
        },
        body: JSON.stringify({ leadId, status: newStatus }),
      });
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_email");
    setIsAuthenticated(false);
    setActiveUserEmail(null);
    setLeads([]);
    setEmail("");
    setPassword("");
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.nombre.toLowerCase().includes(search.toLowerCase()) ||
      lead.telefono.toLowerCase().includes(search.toLowerCase()) ||
      lead.pais.toLowerCase().includes(search.toLowerCase()) ||
      lead.interes.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "Todos" || lead.status === statusFilter;
    const matchesCapital =
      capitalFilter === "Todos"
        ? true
        : capitalFilter === "High-Ticket"
        ? lead.capital.includes("3.000") || lead.capital.includes("1.000")
        : lead.capital.includes(capitalFilter);

    return matchesSearch && matchesStatus && matchesCapital;
  });

  // Metrics
  const totalLeads = leads.length;
  const highTicketLeads = leads.filter(
    (l) => l.capital.includes("3.000") || l.capital.includes("1.000")
  ).length;
  const urgentLeads = leads.filter((l) => l.urgencia.includes("Inmediata")).length;
  const closedLeads = leads.filter((l) => l.status === "Cerrado").length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#1a1a1a] border border-[#333333] p-8 sm:p-10 rounded-2xl shadow-2xl text-center relative overflow-hidden">
          <div className="w-16 h-16 bg-[#c5a059]/10 border border-[#c5a059]/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#c5a059]">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black uppercase font-heading text-[#c5a059] mb-2 tracking-wider">
            MÉTODO LL ADMIN
          </h1>
          <p className="text-xs text-[#b0b0b0] mb-8 uppercase tracking-widest font-semibold">
            Acceso Privado al Panel de Control
          </p>

          {authError && (
            <div className="mb-6 p-3.5 bg-red-950/60 border border-red-800 text-red-300 text-xs rounded-lg flex items-center gap-2 text-left">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#b0b0b0] mb-1.5 font-semibold">
                Correo Electrónico
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gmail.com"
                  className="w-full p-3.5 pl-11 bg-[#050505] border border-[#333333] focus:border-[#c5a059] text-white text-sm rounded-lg outline-none transition-colors"
                  autoFocus
                  required
                />
                <Mail className="w-4 h-4 text-[#666666] absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#b0b0b0] mb-1.5 font-semibold">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full p-3.5 pl-11 bg-[#050505] border border-[#333333] focus:border-[#c5a059] text-white text-sm rounded-lg outline-none transition-colors"
                  required
                />
                <KeyRound className="w-4 h-4 text-[#666666] absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-2 bg-[#c5a059] hover:bg-transparent text-[#050505] hover:text-[#c5a059] font-bold text-xs uppercase tracking-wider rounded-lg border-2 border-[#c5a059] transition-all duration-300 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Autenticando...</span>
              ) : (
                <>
                  <span>Iniciar Sesión Segura</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-[10px] text-[#444444] mt-8 uppercase tracking-widest font-mono">
            Método LL © {new Date().getFullYear()} • Sistema Blindado Privado
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#f8f8f8] p-4 sm:p-8">
      <div className="max-w-[1300px] mx-auto space-y-8">
        {/* Top Navbar */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#1a1a1a] p-6 rounded-2xl border border-[#333333] shadow-lg">
          <div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#c5a059]" />
              <h1 className="text-2xl font-black uppercase tracking-wider text-white font-heading">
                MÉTODO LL <span className="text-[#c5a059]">ADMIN</span>
              </h1>
            </div>
            <p className="text-xs text-[#b0b0b0] mt-1 flex items-center gap-2">
              <span>Sesión activa:</span>
              <span className="text-[#c5a059] font-semibold">{activeUserEmail}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const currentToken = localStorage.getItem("admin_token");
                if (currentToken) fetchLeads(currentToken);
              }}
              className="p-3 bg-[#050505] border border-[#333333] hover:border-[#c5a059] text-white rounded-lg transition-colors flex items-center gap-2 text-xs font-semibold"
              title="Actualizar lista"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#c5a059]" : ""}`} />
              <span className="hidden sm:inline">Actualizar</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-3 bg-red-950/40 border border-red-900 hover:bg-red-900/60 text-red-300 rounded-lg transition-colors flex items-center gap-2 text-xs font-semibold"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </header>

        {/* Warning Banner */}
        {warningMessage && (
          <div className="p-4 bg-[#1a1a1a] border border-amber-500/40 rounded-xl flex items-center gap-3 text-amber-200 text-xs">
            <Database className="w-5 h-5 text-amber-400 shrink-0" />
            <span>{warningMessage}</span>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#1a1a1a] border border-[#333333] p-6 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-xs uppercase text-[#b0b0b0] font-semibold tracking-wider">Total Prospectos</div>
              <div className="text-3xl font-black text-white mt-1 font-heading">{totalLeads}</div>
            </div>
            <div className="p-3 bg-[#c5a059]/10 border border-[#c5a059]/30 rounded-lg text-[#c5a059]">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-[#1a1a1a] border border-[#333333] p-6 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-xs uppercase text-[#b0b0b0] font-semibold tracking-wider">High-Ticket (&gt;$1k)</div>
              <div className="text-3xl font-black text-[#c5a059] mt-1 font-heading">{highTicketLeads}</div>
            </div>
            <div className="p-3 bg-[#c5a059]/10 border border-[#c5a059]/30 rounded-lg text-[#c5a059]">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-[#1a1a1a] border border-[#333333] p-6 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-xs uppercase text-[#b0b0b0] font-semibold tracking-wider">Urgencia Inmediata</div>
              <div className="text-3xl font-black text-amber-400 mt-1 font-heading">{urgentLeads}</div>
            </div>
            <div className="p-3 bg-amber-400/10 border border-amber-400/30 rounded-lg text-amber-400">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-[#1a1a1a] border border-[#333333] p-6 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-xs uppercase text-[#b0b0b0] font-semibold tracking-wider">Cierres Realizados</div>
              <div className="text-3xl font-black text-emerald-400 mt-1 font-heading">{closedLeads}</div>
            </div>
            <div className="p-3 bg-emerald-400/10 border border-emerald-400/30 rounded-lg text-emerald-400">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-[#1a1a1a] border border-[#333333] p-6 rounded-xl space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                value={search}
                onChange={(e) => startTransition(() => setSearch(e.target.value))}
                placeholder="Buscar por nombre, teléfono, país..."
                className="w-full p-3.5 pl-11 bg-[#050505] border border-[#333333] focus:border-[#c5a059] text-white rounded-lg outline-none text-sm"
              />
              <Search className="w-4 h-4 text-[#666666] absolute left-4 top-1/2 -translate-y-1/2" />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {["Todos", "Nuevo", "Contactado", "En Negociación", "Cerrado"].map((st) => (
                <button
                  key={st}
                  onClick={() => startTransition(() => setStatusFilter(st))}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    statusFilter === st
                      ? "bg-[#c5a059] text-[#050505]"
                      : "bg-[#050505] border border-[#333333] text-[#b0b0b0] hover:text-white"
                  }`}
                >
                  {st}
                </button>
              ))}

              <button
                onClick={() =>
                  startTransition(() =>
                    setCapitalFilter((prev) => (prev === "High-Ticket" ? "Todos" : "High-Ticket"))
                  )
                }
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  capitalFilter === "High-Ticket"
                    ? "bg-[#c5a059] text-[#050505]"
                    : "bg-[#050505] border border-[#333333] text-[#b0b0b0] hover:text-white"
                }`}
              >
                <Filter className="w-3.5 h-3.5" /> High-Ticket
              </button>
            </div>
          </div>
        </div>

        {/* Lead Table / List */}
        <div className="bg-[#1a1a1a] border border-[#333333] rounded-xl overflow-hidden shadow-xl">
          {filteredLeads.length === 0 ? (
            <div className="p-16 text-center text-[#888888]">
              <Users className="w-12 h-12 mx-auto mb-3 text-[#444444]" />
              <p className="text-base font-semibold text-white">No hay prospectos registrados</p>
              <p className="text-xs mt-1 max-w-md mx-auto">
                Los formularios completados por los clientes en la landing page aparecerán aquí automáticamente.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#050505] border-b border-[#333333] text-xs uppercase text-[#b0b0b0] tracking-wider font-semibold">
                  <tr>
                    <th className="p-4">Prospecto</th>
                    <th className="p-4">Programa / Interés</th>
                    <th className="p-4">Capital / Urgencia</th>
                    <th className="p-4">Estado</th>
                    <th className="p-4">Fecha</th>
                    <th className="p-4 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262626]">
                  {filteredLeads.map((lead) => {
                    const isHighTicket =
                      lead.capital.includes("3.000") || lead.capital.includes("1.000");

                    const waMsg = `Hola ${lead.nombre}! Soy Lucas de Método LL. Recibí tu aplicación para ${lead.interes} y me gustaría conversar directamente sobre tu proyecto.`;
                    const waLink = `https://wa.me/${lead.telefono.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                      waMsg
                    )}`;

                    return (
                      <tr
                        key={lead.id}
                        className="hover:bg-[#151515] transition-colors cursor-pointer"
                        onClick={() => setSelectedLead(lead)}
                      >
                        <td className="p-4">
                          <div className="font-bold text-white flex items-center gap-2">
                            {lead.nombre}
                            {isHighTicket && (
                              <span className="px-2 py-0.5 bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/30 text-[10px] rounded uppercase font-bold">
                                VIP
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-[#b0b0b0]">
                            {lead.telefono} • {lead.pais}
                          </div>
                        </td>

                        <td className="p-4 text-xs font-medium text-white max-w-xs truncate">
                          {lead.interes}
                        </td>

                        <td className="p-4 text-xs">
                          <div className="text-[#c5a059] font-bold">{lead.capital}</div>
                          <div className="text-[#888888]">{lead.urgencia}</div>
                        </td>

                        <td className="p-4" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={lead.status}
                            onChange={(e) =>
                              updateLeadStatus(lead.id, e.target.value as Lead["status"])
                            }
                            className={`px-3 py-1.5 rounded text-xs font-bold outline-none border cursor-pointer ${
                              lead.status === "Nuevo"
                                ? "bg-amber-950/60 border-amber-600 text-amber-300"
                                : lead.status === "Contactado"
                                ? "bg-blue-950/60 border-blue-600 text-blue-300"
                                : lead.status === "En Negociación"
                                ? "bg-purple-950/60 border-purple-600 text-purple-300"
                                : "bg-emerald-950/60 border-emerald-600 text-emerald-300"
                            }`}
                          >
                            <option value="Nuevo" className="bg-[#1a1a1a] text-amber-300">
                              Nuevo
                            </option>
                            <option value="Contactado" className="bg-[#1a1a1a] text-blue-300">
                              Contactado
                            </option>
                            <option value="En Negociación" className="bg-[#1a1a1a] text-purple-300">
                              En Negociación
                            </option>
                            <option value="Cerrado" className="bg-[#1a1a1a] text-emerald-300">
                              Cerrado
                            </option>
                          </select>
                        </td>

                        <td className="p-4 text-xs text-[#888888] whitespace-nowrap">
                          {new Date(lead.createdAt).toLocaleDateString("es-AR", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>

                        <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#c5a059] hover:bg-[#dfb668] text-[#050505] font-bold text-xs rounded transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-[#333333] p-8 rounded-2xl max-w-xl w-full shadow-2xl relative space-y-6">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-6 right-6 text-[#888888] hover:text-white p-1"
            >
              <X className="w-6 h-6" />
            </button>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs uppercase tracking-wider text-[#c5a059] font-semibold">
                  Detalle de Aplicación
                </span>
                <span className="text-xs text-[#888888]">• ID: {selectedLead.id}</span>
              </div>
              <h2 className="text-2xl font-bold text-white font-heading">{selectedLead.nombre}</h2>
              <p className="text-sm text-[#b0b0b0]">
                {selectedLead.telefono} • {selectedLead.pais}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-[#050505] rounded-xl border border-[#262626] text-xs">
              <div>
                <div className="text-[#888888] uppercase mb-1">Programa Solicitado</div>
                <div className="font-semibold text-white">{selectedLead.interes}</div>
              </div>
              <div>
                <div className="text-[#888888] uppercase mb-1">Capacidad de Inversión</div>
                <div className="font-bold text-[#c5a059]">{selectedLead.capital}</div>
              </div>
              <div>
                <div className="text-[#888888] uppercase mb-1">Urgencia</div>
                <div className="font-semibold text-white">{selectedLead.urgencia}</div>
              </div>
              <div>
                <div className="text-[#888888] uppercase mb-1">Estado Actual</div>
                <div className="font-semibold text-amber-300">{selectedLead.status}</div>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase text-[#888888] mb-2 font-semibold">
                Diagnóstico & Obstáculo Principal:
              </div>
              <div className="p-4 bg-[#050505] rounded-xl border border-[#262626] text-sm text-[#e0e0e0] leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
                {selectedLead.situacion || "Sin descripción proporcionada."}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <a
                href={`https://wa.me/${selectedLead.telefono.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  `Hola ${selectedLead.nombre}! Soy Lucas de Método LL. Estuve revisando tu aplicación para ${selectedLead.interes} y me gustaría conversar directamente sobre tu proyecto.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#c5a059] hover:bg-[#dfb668] text-[#050505] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Contactar por WhatsApp Directo</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
