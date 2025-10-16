export interface Garage {
  id: number;
  name: string;
  distance?: string;
  driving?: string;
  location: string;
  rating?: string;
  reviews?: string;
  latitude: number;
  longitude: number;
  image?: string | null;
  address: string;
  category: string;
}

// Basic workshop list type
export interface Workshop {
  id: number;
  title: string;
  address: string;
  contact_phone: string;
  category: string;
  latitude: number;
  longitude: number;
  image?: string | null;
  permalink?: string;
  whatsapp?: string;
  email?: string;
  amenities?: string[];
  services?: {
    mechanical?: string[];
    electrical?: string[];
    painting?: string[];
    washing?: string[];
    tyre?: string[];
    emergency?: string[];
  };
}

// Detailed single workshop type
export interface FullWorkshopDetail {
  id: number;
  title: string;
  content: string; // HTML content (description)
  featured_image?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  contact_phone?: string;
  contact_email?: string;
  whatsapp?: string;
  google_map_link?: string;
  permalink?: string;
  gallery?: string[];
  vehicle_services?: string[];
  mechanical_services?: string[];
  electrical_services?: string[];
  painting_services?: string[];
  washing_services?: string[];
  emergency_services?: string[];
  general_services?: string[];
  amenities?: string[];
  payment_methods?: string[];
  categories?: string[];
  opening_hours: {
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
    Sunday: string;
  };
  gallery_image_url?: string;
  services_html?: string;
  [key: string]: any; // fallback for extra fields
}

// -------------------------------------------------------------
//  REACT NAVIGATION ROUTE TYPES
// -------------------------------------------------------------

export type RootStackParamList = {
  Home: undefined;
  AboutUs: undefined;
  AllWorkshop: undefined;
  WorkshopDetail: {
    workshopId: string;
    name: string;
  };
  Login: undefined;
  Register: undefined;
  RegisterBusiness: undefined;
  AddListing: undefined;
  MapSearch: undefined;
};
