export const menuitem = [
  {
    id: 'home',
    label: 'Menu principal',
    items: [
      {
        label: 'Dashboard',
        id: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/'],
      },
      // {
      //   id: 'list-members',
      //   label: 'Listado de Miembros',
      //   icon: 'pi pi-list',
      //   routerLink: ['/person-list/manage'],
      // },
      // {
      //   id: 'list-network',
      //   label: 'Listado de redes',
      //   icon: 'pi pi-sitemap',
      //   routerLinkActiveOptions: { exact: false },
      //   routerLink: ['/network'],
      // },
    ],
  },
  {
    separator: true,
  },
  {
    id: 'employees',
    label: 'Gestión de empleados',
    items: [
      {
        id: 'list-employees',
        label: 'Listado de empleados',
        icon: 'pi pi-users',
        routerLink: ['/employees/manage'],
      },
      {
        id: 'new-employee',
        label: 'Registrar empleado',
        icon: 'pi pi-user-plus',
        routerLink: ['/employees/create/new-register'],
      },
    ],
  },
  // {
  //   id: 'Affirmation',
  //   label: 'Afirmación',
  //   routerLinkActiveOptions: { exact: false },
  //   items: [
  //     {
  //       id: 'new-profesion',
  //       label: 'Profesiones de fe',
  //       icon: 'pi pi-flag-fill',
  //       //routerLink: ['/profession-of-faith'],
  //       items: [
  //         {
  //           id: 'new-profesion-fe',
  //           label: 'Registrar datos',
  //           routerLink: ['/profession/create'],
  //           routerLinkActiveOptions: { exact: false },
  //         },
  //         {
  //           id: 'list-profession',
  //           label: 'Listado de profesiones de fe',
  //           routerLink: ['/profession/manage'],
  //         },
  //       ],
  //     },
  //     {
  //       id: 'new-bienvenida',
  //       label: 'Fiestas de bienvenida',
  //       icon: 'pi pi-flag',
  //       routerLink: ['/affirmation/welcome-party'],
  //       routerLinkActiveOptions: { exact: false },
  //     },
  //     {
  //       id: 'new-sanidadin',
  //       label: 'Retiro de sanidad interior',
  //       icon: 'pi pi-wave-pulse',
  //       routerLink: ['/affirmation/interior-health'],
  //       routerLinkActiveOptions: { exact: false },
  //     },
  //     {
  //       id: 'new-escuelav',
  //       label: 'Escuelas de la visión',
  //       icon: 'pi pi-graduation-cap',
  //       items: [
  //         {
  //           id: 'esc-creyente',
  //           label: 'Esc. para Nuevo creyente',
  //           routerLink: ['/vission-scool/manage/b06a27db-de34-4fdf-a768-fc3bc4cae704'],
  //         },
  //         {
  //           id: 'esc-Miembro',
  //           label: 'Esc. para Miembro',
  //           routerLink: ['/vission-scool/manage/7df9148a-1b4a-4f17-8999-076318a40a1c'],
  //         },
  //         {
  //           id: 'esc-discipulo',
  //           label: 'Esc. para Discipulos',
  //           routerLink: ['/vission-scool/manage/c241c272-fffd-450c-9591-285dc0d77c4f'],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: 'Events',
  //   label: 'Eventos',
  //   items: [
  //     //  {
  //     //    id: 'new-event',
  //     //    label: 'Registrar evento',
  //     //    icon: 'pi pi-calendar-plus',
  //     //    routerLink: ['/event/create'],
  //     //    routerLinkActiveOptions: { exact: false },
  //     //  },
  //     {
  //       id: 'list-event',
  //       label: 'Listado de eventos',
  //       icon: 'pi pi-calendar',
  //       routerLink: ['/event/manage'],
  //     },
  //   ],
  // },
  // {
  //   separator: true,
  // },
  // {
  //   id: 'admin',
  //   label: 'Administración',
  //   routerLinkActiveOptions: { exact: false },
  //   items: [
  //     {
  //       id: 'user-management',
  //       label: 'Gestion de usuarios',
  //       icon: 'pi pi-users',
  //       routerLink: ['/admin/user/manage'],
  //       routerLinkActiveOptions: { exact: false },
  //     },
  //     {
  //       id: 'other-reports',
  //       label: `Otros reportes`,
  //       icon: 'pi pi-file-pdf',
  //       routerLink: ['/admin/reports'],
  //       routerLinkActiveOptions: { exact: false },
  //     },
  //   ],
  // },
];
