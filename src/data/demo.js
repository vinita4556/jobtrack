const day = (offset) => {
  const d = new Date()
  d.setDate(d.getDate() + offset)
  return d.toISOString().slice(0, 10)
}
const make = (i, company, role, location, jobType, salary, status, applied, deadline, tags, notes) => ({
  id: `demo-${i}`, company, role, location, jobType, salary, status,
  appliedDate: day(applied), deadline: deadline === null ? '' : day(deadline),
  jobUrl: 'https://example.com/careers', notes, tags, createdAt: day(applied) + 'T09:00:00.000Z',
})

export const demoApplications = [
  make(1, 'Google', 'Frontend Developer Intern', 'Bengaluru, India', 'Internship', '₹60,000/mo', 'Applied', -3, 2, ['react', 'frontend'], 'Demo data: referred by a college senior.'),
  make(2, 'Microsoft', 'Software Engineer Intern', 'Hyderabad, India', 'Internship', '₹80,000/mo', 'Interview', -12, 6, ['javascript', 'dsa'], 'Demo data: online assessment cleared.'),
  make(3, 'Amazon', 'SDE I', 'Remote', 'Remote', '₹18 LPA', 'Applied', -8, 14, ['react', 'aws'], 'Demo data.'),
  make(4, 'Infosys', 'Frontend Engineer', 'Pune, India', 'Full-time', '₹7 LPA', 'Offer', -30, null, ['react', 'tailwind'], 'Demo data: offer letter received.'),
  make(5, 'Deloitte', 'Web Developer', 'Mumbai, India', 'Full-time', '₹9 LPA', 'Rejected', -40, null, ['ui', 'javascript'], 'Demo data.'),
  make(6, 'Razorpay', 'UI Engineer', 'Bengaluru, India', 'Contract', '₹1,00,000/mo', 'Interview', -20, 10, ['design-system', 'react'], 'Demo data.'),
]
