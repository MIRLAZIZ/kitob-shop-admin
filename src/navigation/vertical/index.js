export default [
  {
    title: 'Home',
    to: { name: 'root' },
    icon: { icon: 'tabler-smart-home' },
    action: 'create',
    subject: 'all', 
  },
  {
    title: 'Second page',
    to: { name: 'second-page' },
    icon: { icon: 'tabler-file' },
    action: 'create',
    subject: 'all', 
  },
  {
    title: 'Test',
    to: { name: 'test' },
    icon: { icon: 'tabler-file' },

    // action: 'create',
    // subject: 'all',

    action: 'read',
    subject: 'all',
  },
]
