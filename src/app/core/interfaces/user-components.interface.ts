export interface responseUserComponents {
  user_id: number;
  rol: string;
  component_id: number;
  components: Components;
}

interface Components {
  components_id: number;
  description: string;
  orden: number;
  visible: boolean;
}