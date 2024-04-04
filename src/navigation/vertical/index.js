export default [
  {
    title: 'Home',
    to: { name: 'root' },
    icon: { icon: 'tabler-smart-home' },
    action: 'create',
    subject: 'all', 
  },
  {
    title: 'categorya',
    to: { name: 'second-page' },
    icon: { icon: 'tabler-file' },
    action: 'create',
    subject: 'all', 
  },
  {
    title: 'prouducts',
    to: { name: 'product-list' },
    icon: { icon: 'tabler-file' },

    // action: 'create',
    // subject: 'all',

    action: 'read',
    subject: 'all',
  },

  {
    title: 'customer',
    to: { name: 'client' },
    icon: { icon: 'tabler-file' },


    action: 'read',
    subject: 'all',
  },
  
  {
    title: 'customer',
    to: { name: 'invoice' },
    icon: { icon: 'tabler-file' },

  },
]
