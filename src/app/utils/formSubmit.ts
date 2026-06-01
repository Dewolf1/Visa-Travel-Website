/**
 * Form submission utility — WhatsApp + Web3Forms email delivery.
 *
 * TO ACTIVATE EMAIL DELIVERY:
 * 1. Visit https://web3forms.com — enter your email (no signup needed)
 * 2. They'll send a free Access Key by email
 * 3. Replace 'YOUR_WEB3FORMS_ACCESS_KEY' below with your key
 *
 * Without a key, all forms still work perfectly via WhatsApp.
 */
export const WEB3FORMS_KEY = '60aabe17-99d2-44bb-9305-b4908cac2b93';

export interface FormPayload {
  subject: string;
  name: string;
  phone: string;
  email?: string;
  [key: string]: string | undefined;
}

/**
 * Submit form data. Returns true if email was sent, false if WhatsApp fallback.
 * Never throws — always resolves quickly so UI never freezes.
 */
export async function submitForm(payload: FormPayload): Promise<{ waLink: string; emailSent: boolean }> {
  // Always build the WhatsApp link first — it's the guaranteed delivery method
  const waLink = buildWhatsAppLink(payload);

  // If no key configured, skip network entirely — respond immediately
  if (!WEB3FORMS_KEY || WEB3FORMS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
    // Small artificial delay so the spinner feels natural
    await new Promise(r => setTimeout(r, 800));
    return { waLink, emailSent: false };
  }

  // Try Web3Forms with a 6-second timeout so it never hangs
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);

    const body = new FormData();
    body.append('access_key', WEB3FORMS_KEY);
    body.append('from_name', 'VisaOVisa Website');
    Object.entries(payload).forEach(([k, v]) => {
      if (v) body.append(k, v);
    });

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body,
      signal: controller.signal,
    });
    clearTimeout(timer);
    const json = await res.json();
    return { waLink, emailSent: json.success === true };
  } catch {
    return { waLink, emailSent: false };
  }
}

/** Build a WhatsApp deep-link from form data */
export function buildWhatsAppLink(payload: FormPayload): string {
  const lines = Object.entries(payload)
    .filter(([k, v]) => k !== 'subject' && v)
    .map(([k, v]) => `*${k.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}:* ${v}`)
    .join('\n');

  const text = encodeURIComponent(`*${payload.subject} — VisaOVisa*\n\n${lines}`);
  return `https://wa.me/919873005319?text=${text}`;
}
