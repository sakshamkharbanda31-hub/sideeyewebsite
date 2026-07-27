import { connectDB } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";

interface LeadRow {
  _id: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  budget: string;
  message: string;
  status: string;
  createdAt: string;
}

async function getLeads(): Promise<LeadRow[]> {
  await connectDB();
  const leads = await Lead.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(leads));
}

const statusStyles: Record<string, string> = {
  new: "bg-accent/10 text-accent border-accent/30",
  contacted: "bg-black/5 text-ink border-black/10",
  closed: "bg-black/5 text-muted border-black/10",
};

export default async function AdminLeadsPage() {
  const leads = await getLeads();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-ink">
          Leads ({leads.length})
        </h2>
      </div>

      {leads.length === 0 ? (
        <p className="mt-6 text-sm text-muted">No leads submitted yet.</p>
      ) : (
        <div className="mt-6 overflow-x-auto border border-black/10">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="border-b border-black/10 bg-stone">
              <tr>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">Date</th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">Name</th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">Contact</th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">Interest</th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">Budget</th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">Message</th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="border-b border-black/5 bg-surface align-top last:border-b-0">
                  <td className="whitespace-nowrap px-4 py-4 text-muted">
                    {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-4 font-medium text-ink">{lead.name}</td>
                  <td className="px-4 py-4 text-muted">
                    <div>{lead.email}</div>
                    <div>{lead.phone}</div>
                  </td>
                  <td className="px-4 py-4 text-muted">{lead.interest}</td>
                  <td className="px-4 py-4 text-muted">{lead.budget}</td>
                  <td className="max-w-xs px-4 py-4 text-muted">
                    <p className="line-clamp-3">{lead.message}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-block border px-2.5 py-1 text-xs font-medium uppercase tracking-wider ${
                        statusStyles[lead.status] || statusStyles.new
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}