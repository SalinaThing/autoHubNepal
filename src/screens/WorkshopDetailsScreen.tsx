// src/screens/WorkshopDetailScreen.tsx
import React, { JSX, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
  Image,
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import RenderHtml from "react-native-render-html";
import { RootStackParamList, FullWorkshopDetail } from "../navigations/Types";

const DETAIL_API_URL =
  "https://www.autohubnepal.com/wp-json/simple-jwt-login/v1/autohub_api_get_detail";

type WorkshopDetailRouteProp = RouteProp<RootStackParamList, "WorkshopDetail">;

const DEFAULT_HOURS = {
  Monday: "9:00 AM - 7:00 PM",
  Tuesday: "9:00 AM - 7:00 PM",
  Wednesday: "9:00 AM - 7:00 PM",
  Thursday: "9:00 AM - 7:00 PM",
  Friday: "9:00 AM - 7:00 PM",
  Saturday: "9:00 AM - 5:00 PM",
  Sunday: "Closed",
} as const;

export default function WorkshopDetailScreen(): JSX.Element {
  const route = useRoute<WorkshopDetailRouteProp>();
  const { width } = useWindowDimensions();
  const { workshopId, name } = route.params;

  const [details, setDetails] = useState<FullWorkshopDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const htmlSource = useMemo(
    () => ({
      html:
        details?.content ??
        "<p>No detailed description available for this workshop.</p>",
    }),
    [details]
  );

  const baseStyle = useMemo(
    () => ({
      fontSize: 16,
      color: "#333",
      lineHeight: 24,
    }),
    []
  );

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Ensure id is a number when sending to API
        const idToSend = Number(workshopId);

        const response = await fetch(DETAIL_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: idToSend }),
        });

        if (!response.ok) {
          throw new Error(`API call failed (Status: ${response.status}).`);
        }

        const json = await response.json();
        // API sometimes returns object (detail) or { data: detail }
        const item = (json && (json.data ?? json)) as any;

        // Map API response to FullWorkshopDetail
        const mapped: FullWorkshopDetail = {
          id: Number(item.id),
          title: item.title ?? `Workshop ${idToSend}`,
          content: item.content ?? "",
          featured_image: item.featured_image ?? undefined,
          address:
            item._autogarage_Localaddress ||
            item._autogarage_google_address ||
            "Address not available",
          latitude:
            item._autogarage_latitude !== undefined
              ? Number(item._autogarage_latitude)
              : undefined,
          longitude:
            item._autogarage_longitude !== undefined
              ? Number(item._autogarage_longitude)
              : undefined,
          contact_phone: item._autogarage_phone ?? item._autogarage_phone ?? "N/A",
          contact_email: item._autogarage_email ?? undefined,
          whatsapp: item._autogarage_whatsapp ?? undefined,
          amenities: Array.isArray(item._autogarage_amenities)
            ? item._autogarage_amenities
            : [],
          categories: Array.isArray(item.categories) ? item.categories : [],
          gallery: Array.isArray(item._autogarage_gallery)
            ? item._autogarage_gallery
            : item._autogarage_gallery
            ? [item._autogarage_gallery]
            : [],
          vehicle_services: Array.isArray(item._autogarage_vehicle_services)
            ? item._autogarage_vehicle_services
            : [],
          mechanical_services: Array.isArray(item._autogarage_mechanical_services)
            ? item._autogarage_mechanical_services
            : [],
          electrical_services: Array.isArray(item._autogarage_electrical_services)
            ? item._autogarage_electrical_services
            : [],
          painting_services: Array.isArray(item._autogarage_painting_services)
            ? item._autogarage_painting_services
            : [],
          washing_services: Array.isArray(item._autogarage_washing_services)
            ? item._autogarage_washing_services
            : [],
          emergency_services: Array.isArray(item._autogarage_emergency_services)
            ? item._autogarage_emergency_services
            : [],
          general_services: Array.isArray(item._autogarage_general_services)
            ? item._autogarage_general_services
            : [],
          payment_methods: Array.isArray(item._autogarage_payment_methods)
            ? item._autogarage_payment_methods
            : [],
          opening_hours: {
            Monday: item._autogarage_monday_hours ?? DEFAULT_HOURS.Monday,
            Tuesday: item._autogarage_tuesday_hours ?? DEFAULT_HOURS.Tuesday,
            Wednesday: item._autogarage_wednesday_hours ?? DEFAULT_HOURS.Wednesday,
            Thursday: item._autogarage_thursday_hours ?? DEFAULT_HOURS.Thursday,
            Friday: item._autogarage_friday_hours ?? DEFAULT_HOURS.Friday,
            Saturday: item._autogarage_saturday_hours ?? DEFAULT_HOURS.Saturday,
            Sunday: item._autogarage_sunday_hours ?? DEFAULT_HOURS.Sunday,
          },
          // keep optional compatibility fields
          gallery_image_url: Array.isArray(item._autogarage_gallery) && item._autogarage_gallery.length > 0
            ? item._autogarage_gallery[0]
            : item._autogarage_gallery ?? undefined,
          services_html: item.services_html ?? undefined,
        };

        setDetails(mapped);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch workshop details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [workshopId]);

  const handlePhonePress = (phone?: string) => {
    if (!phone) return;
    Linking.openURL(`tel:${phone}`).catch((e) => console.error("Tel open failed", e));
  };
  const handleEmailPress = (email?: string) => {
    if (!email) return;
    Linking.openURL(`mailto:${email}`).catch((e) => console.error("Mail open failed", e));
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#e63946" />
        <Text style={styles.loadingText}>
          Loading details for {name} (ID: {workshopId})...
        </Text>
      </View>
    );
  }

  if (error || !details) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>🚨 Error Loading Workshop</Text>
        <Text style={styles.detailErrorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Top Image */}
      {details.gallery && details.gallery.length > 0 && (
        <Image
          source={{ uri: details.gallery[0] }}
          style={styles.mainImage}
          resizeMode="cover"
        />
      )}

      <View style={styles.content}>
        <Text style={styles.name}>{details.title}</Text>

        {/* Contact Info */}
        <View style={styles.infoBox}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <Text style={styles.contactText}>📍 {details.address}</Text>

          <TouchableOpacity onPress={() => handlePhonePress(details.contact_phone)}>
            <Text style={styles.contactText}>📞 {details.contact_phone}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleEmailPress(details.contact_email)}>
            <Text style={styles.contactText}>📧 {details.contact_email ?? "Not provided"}</Text>
          </TouchableOpacity>

          <Text style={styles.contactText}>💬 WhatsApp: {details.whatsapp ?? "N/A"}</Text>
        </View>

        {/* Hours */}
        <View style={styles.infoBox}>
          <Text style={styles.sectionTitle}>Opening Hours</Text>
          {Object.entries(details.opening_hours).map(([day, time]) => (
            <View key={day} style={styles.hourRow}>
              <Text style={styles.hourDay}>{day}</Text>
              <Text style={styles.hourTime}>{time}</Text>
            </View>
          ))}
        </View>

        {/* Description */}
        <View style={styles.infoBox}>
          <Text style={styles.sectionTitle}>About</Text>
          <RenderHtml contentWidth={width - 40} source={htmlSource} baseStyle={baseStyle} />
        </View>

        {/* Gallery */}
        {details.gallery && details.gallery.length > 1 && (
          <View style={styles.infoBox}>
            <Text style={styles.sectionTitle}>Gallery</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {details.gallery.map((url: string, index: number) => (
                <Image
                  key={`g-${index}`}
                  source={{ uri: url }}
                  style={styles.galleryImage}
                />
              ))}
            </ScrollView>
          </View>
        )}

        {/* Services */}
        <View style={styles.infoBox}>
          <Text style={styles.sectionTitle}>Services Offered</Text>

          {details.mechanical_services && details.mechanical_services.length > 0 && (
            <>
              <Text style={styles.serviceHeading}>🛠️ Mechanical Services</Text>
              {details.mechanical_services.map((s: string, i: number) => (
                <Text key={`mech-${i}`} style={styles.serviceItem}>
                  • {s.replace(/_/g, " ")}
                </Text>
              ))}
            </>
          )}

          {details.electrical_services && details.electrical_services.length > 0 && (
            <>
              <Text style={styles.serviceHeading}>⚡ Electrical Services</Text>
              {details.electrical_services.map((s: string, i: number) => (
                <Text key={`elec-${i}`} style={styles.serviceItem}>
                  • {s.replace(/_/g, " ")}
                </Text>
              ))}
            </>
          )}

          {details.washing_services && details.washing_services.length > 0 && (
            <>
              <Text style={styles.serviceHeading}>🚿 Washing Services</Text>
              {details.washing_services.map((s: string, i: number) => (
                <Text key={`wash-${i}`} style={styles.serviceItem}>
                  • {s.replace(/_/g, " ")}
                </Text>
              ))}
            </>
          )}

          {details.painting_services && details.painting_services.length > 0 && (
            <>
              <Text style={styles.serviceHeading}>🎨 Painting Services</Text>
              {details.painting_services.map((s: string, i: number) => (
                <Text key={`paint-${i}`} style={styles.serviceItem}>
                  • {s.replace(/_/g, " ")}
                </Text>
              ))}
            </>
          )}

          {details.emergency_services && details.emergency_services.length > 0 && (
            <>
              <Text style={styles.serviceHeading}>🚨 Emergency Services</Text>
              {details.emergency_services.map((s: string, i: number) => (
                <Text key={`em-${i}`} style={styles.serviceItem}>
                  • {s.replace(/_/g, " ")}
                </Text>
              ))}
            </>
          )}
        </View>

        {/* Amenities */}
        {details.amenities && details.amenities.length > 0 && (
          <View style={styles.infoBox}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            {details.amenities.map((a: string, i: number) => (
              <Text key={`amen-${i}`} style={styles.serviceItem}>
                • {a.replace(/_/g, " ")}
              </Text>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f0f0" },
  content: { padding: 15 },
  mainImage: { width: "100%", height: 220, marginBottom: 10 },
  name: {
    fontSize: 26,
    fontWeight: "900",
    color: "#e63946",
    textAlign: "center",
    marginBottom: 10,
  },
  infoBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 10,
    paddingBottom: 4,
  },
  contactText: { fontSize: 15, color: "#444", marginBottom: 4 },
  hourRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  hourDay: { fontWeight: "600", color: "#333" },
  hourTime: { color: "#666" },
  serviceHeading: { fontWeight: "700", color: "#e63946", marginTop: 10 },
  serviceItem: { color: "#333", fontSize: 14, marginLeft: 10, marginBottom: 2 },
  galleryImage: {
    width: 120,
    height: 80,
    borderRadius: 6,
    marginRight: 10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: { marginTop: 10, fontSize: 16, color: "#555" },
  errorText: {
    fontSize: 18,
    color: "#e63946",
    fontWeight: "bold",
    textAlign: "center",
  },
  detailErrorText: { fontSize: 14, color: "#777", textAlign: "center", marginTop: 5 },
});