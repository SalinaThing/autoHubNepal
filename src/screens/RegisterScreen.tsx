import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  Image,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from "react-native";
import * as ImagePicker from "react-native-image-picker";
import Geolocation from "react-native-geolocation-service";
import MapView, { Marker } from "react-native-maps";
import CheckBox from "@react-native-community/checkbox";

const API_URL = "https://www.autohubnepal.com/register-your-business/"; // <- replace with your endpoint

type FormState = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  garageName: string;
  description: string;
  category: string;
  phone: string;
  whatsapp: string;
  emailAddress: string;
  website: string;
  localAddress: string;
};

type LocationCoords = {
  latitude: number;
  longitude: number;
};

type ServicesState = Record<ServiceGroupKey, Set<string>>;

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const SERVICES = {
  VehicleType: [
    "Petrol Vehicles",
    "Diesel Vehicles",
    "All Types of Small Petrol/Diesel Vehicles",
    "Truck / Bus",
    "All types of Heavy Vehicles",
    "Bike Vehicles",
    "Construction Machinery",
    "Electric Vehicles",
  ],
  WashingCleaning: [
    "Bike Washing / Cleaning",
    "Small Vehicle Washing / Cleaning",
    "Heavy Vehicle Washing / Cleaning",
    "Automatic Machine Car Washing",
    "Interior Cleaning",
    "Car Detailing / Polishing",
    "Ceramic Coating / Waxing",
  ],
  Mechanical: [
    "Brake Service",
    "Engine Repair",
    "Transmission Service",
    "Suspension & Steering",
    "Engine Overhaul",
    "Clutch Repair / Replacement",
    "Oil Change Service",
    "AC Repair / Gas Filling",
    "AC Servicing & Filter Cleaning",
    "Radiator / Cooling System",
    "Exhaust / Silencer Repair",
    "Oil Leak Repair",
  ],
  TyreWheel: ["Tire Change", "Wheel Alignment", "Tire Balancing", "Puncture Repair"],
  Electrical: [
    "Engine Diagnostics",
    "Computer Scanning & Programming",
    "Check Engine Light Diagnosis",
    "Electrical Diagnostics",
    "EV Battery Check / Replacement",
    "Headlight / Tail-light Repair & Replacement",
    "Wiring / Fuse Repair",
    "Car Key / Remote Programming",
  ],
};

const OTHER_INFO = ["Wheelchair-accessible entrance", "Restroom", "Free Wi-Fi", "Family Friendly"];
const PARKING = ["Garage Parking", "Paid Parking Access", "Private Parking Available", "EV Charging Station"];
const PAYMENTS = ["Cash", "e-Sewa", "QR Scan", "Bank Transfer"];


type ServiceGroupKey = keyof typeof SERVICES;

// helper function first
const toggleSet = (set: Set<string>, item: string): Set<string> => {
  const newSet = new Set(set);
  if (newSet.has(item)) newSet.delete(item);
  else newSet.add(item);
  return newSet;
};

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => (
  <View style={styles.sectionContainer}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    <View style={styles.sectionBody}>{children}</View>
  </View>
);

export default function RegisterBusinessScreen({ navigation }: { navigation: any }) {
  const [formState, setFormState] = useState<FormState>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    garageName: "",
    description: "",
    category: "",
    phone: "",
    whatsapp: "",
    emailAddress: "",
    website: "",
    localAddress: "",
  });

  const [mainPhoto, setMainPhoto] = useState<ImagePicker.Asset | null>(null);
  const [gallery, setGallery] = useState<ImagePicker.Asset[]>([]);
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [selectedServices, setSelectedServices] = useState<ServicesState>({
    VehicleType: new Set(),
    WashingCleaning: new Set(),
    Mechanical: new Set(),
    TyreWheel: new Set(),
    Electrical: new Set(),
  });

   const [openingHours, setOpeningHours] = useState<Record<string, string>>({
    Sunday: "",
    Monday: "",
    Tuesday: "",
    Wednesday: "",
    Thursday: "",
    Friday: "",
    Saturday: "",
  });

  const [otherInfo, setOtherInfo] = useState(new Set<string>());
  const [parking, setParking] = useState(new Set<string>());
  const [payments, setPayments] = useState(new Set<string>());
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "",
  });

  const serviceGroupKeys = useMemo(() => Object.keys(SERVICES) as ServiceGroupKey[], []);

  const handleChange = (name: keyof FormState, value: string) =>
    setFormState((p) => ({ ...p, [name]: value }));

  const ensureMediaLibraryPermission = async () => {
    if (Platform.OS !== "android") return true;

    const androidRelease =
      typeof Platform.Version === "string" ? parseInt(Platform.Version, 10) : Platform.Version;
    const permission =
      androidRelease >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) return true;

    const granted = await PermissionsAndroid.request(permission, {
      title: "Allow Image Access",
      message: "AutoHub needs your permission to pick images from your gallery.",
      buttonPositive: "Allow",
    });

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert("Permission Required", "Please allow gallery access to upload images.");
      return false;
    }

    return true;
  };

  const pickMainPhoto = async () => {
    const permitted = await ensureMediaLibraryPermission();
    if (!permitted) {
      console.log("❌ Image permission denied");
      return;
    }

    console.log("📸 Opening image picker...");
    const response = await ImagePicker.launchImageLibrary({
      mediaType: "photo",
      quality: 0.8,
      selectionLimit: 1,
    });

    if (response.didCancel) {
      console.log("❌ Image picker cancelled");
      return;
    }
    if (response.errorCode) {
      console.error("❌ Image picker error:", response.errorMessage);
      Alert.alert("Image Error", response.errorMessage || "Failed to pick image");
      return;
    }
    const sel = response.assets?.[0];
    if (!sel || !sel.uri) {
      console.error("❌ No image data returned");
      Alert.alert("Image Error", "No image data was returned.");
      return;
    }
    if (!["image/jpeg", "image/jpg", "image/png"].includes(sel.type || "")) {
      console.error("❌ Invalid image format:", sel.type);
      Alert.alert("Invalid Format", "Please pick a JPG or PNG image only.");
      return;
    }
    console.log("✅ Image selected:", sel.fileName, sel.type, sel.fileSize);
    setMainPhoto(sel);
    Alert.alert("Success", "Photo selected successfully!");
  };

  const pickGalleryImages = async () => {
    const permitted = await ensureMediaLibraryPermission();
    if (!permitted) {
      console.log("❌ Gallery permission denied");
      return;
    }

    console.log("📸 Opening gallery picker...");
    const response = await ImagePicker.launchImageLibrary({
      mediaType: "photo",
      quality: 0.7,
      selectionLimit: 10,
    });

    if (response.didCancel) {
      console.log("❌ Gallery picker cancelled");
      return;
    }
    if (response.errorCode) {
      console.error("❌ Gallery picker error:", response.errorMessage);
      Alert.alert("Image Error", response.errorMessage || "Failed to pick images");
      return;
    }
    if (response.assets && response.assets.length > 0) {
      const allowed = response.assets.filter(
        (asset) =>
          !!asset.uri && ["image/jpeg", "image/jpg", "image/png"].includes(asset.type || "")
      );
      if (allowed.length !== response.assets.length) {
        Alert.alert("Notice", "Some files were skipped (only JPG/PNG allowed).");
      }
      console.log(`✅ Selected ${allowed.length} gallery image(s)`);
      setGallery((prev) => [...prev, ...allowed].slice(0, 10));
      Alert.alert("Success", `${allowed.length} image(s) added to gallery!`);
    }
  };

  const removeGalleryAt = (idx: number) =>
    setGallery((prev) => prev.filter((_, i) => i !== idx));

  const requestLocationPermission = async () => {
    if (Platform.OS !== "android") return true;

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Allow Location Access",
        message: "AutoHub uses your location to show your workshop position.",
        buttonPositive: "Allow",
        buttonNegative: "Deny",
      }
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert("Location Denied", "Please allow location access to use this feature.");
      return false;
    }
    return true;
  };

  const toggleService = (group: ServiceGroupKey, value: string) => {
    setSelectedServices((prev) => {
      const currentSet = prev[group] || new Set<string>();
      return {
        ...prev,
        [group]: toggleSet(currentSet, value),
      };
    });
  };

  const useCurrentLocation = async () => {
    const permitted = await requestLocationPermission();
    if (!permitted) return;

    setGettingLocation(true);
    Geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ latitude, longitude });
        setFormState((p) => ({
          ...p,
          localAddress: `Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(5)}`,
        }));
        setGettingLocation(false);
      },
      (err) => {
        Alert.alert("Location Error", err.message || "Failed to get location");
        setGettingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleSubmit = async () => {
    try{
      const { username, email, password, confirmPassword, garageName,phone, whatsapp } = formState;
      
      //Mandatory fields checks
      if (!username || !email || !password || !confirmPassword || !garageName) {
        Alert.alert("Missing Information", "Please fill all required fields.");
        return;
      }

      // Username validation (letters only)
      if (!/^[A-Za-z ]+$/.test(username)) {
        Alert.alert("Invalid Username", "Username can contain letters only.");
        return;
      }

      // Phone and WhatsApp validation (numbers only)
      if (!/^\d+$/.test(phone)) {
        Alert.alert("Invalid Phone", "Phone number can contain numbers only.");
        return;
      }
      if (whatsapp && !/^\d+$/.test(whatsapp)) {
        Alert.alert("Invalid WhatsApp", "WhatsApp number can contain numbers only.");
        return;
      }
      
      //
      if (password !== confirmPassword) {
        Alert.alert("Password Mismatch", "Passwords do not match.");
        return;
      }

      // build services array
      const services: string[] = [];
      serviceGroupKeys.forEach((key) => {
        selectedServices[key].forEach((value) => services.push(value));
      });

      setUploading(true);

        try 
        {
          console.log("📦 Preparing FormData...");
          const fd = new FormData();
          
          // Add form fields
          Object.entries(formState).forEach(([k, v]) => {
            fd.append(k, v || "");
            console.log(`  ✓ Added field: ${k} = ${v || "(empty)"}`);
          });
          
          if (location) {
            fd.append("latitude", String(location.latitude));
            fd.append("longitude", String(location.longitude));
            console.log(`  ✓ Added location: ${location.latitude}, ${location.longitude}`);
          }

          Object.entries(selectedServices).forEach(([k, set]) =>
            fd.append(k, JSON.stringify(Array.from(set)))
          );
          fd.append("openingHours", JSON.stringify(openingHours));
          fd.append("otherInfo", JSON.stringify(Array.from(otherInfo)));
          fd.append("parking", JSON.stringify(Array.from(parking)));
          fd.append("payments", JSON.stringify(Array.from(payments)));
          fd.append("socialLinks", JSON.stringify(socialLinks));

          // Add main photo
          if (mainPhoto && mainPhoto.uri) {
            const photoData = {
              uri: Platform.OS === "android" ? mainPhoto.uri : mainPhoto.uri.replace("file://", ""),
              type: mainPhoto.type || "image/jpeg",
              name: mainPhoto.fileName || `businessPhoto_${Date.now()}.jpg`,
            };
            fd.append("businessPhoto", photoData as any);
            console.log(`  ✅ Added main photo: ${photoData.name} (${photoData.type})`);
            console.log(`     URI: ${photoData.uri.substring(0, 50)}...`);
          } else {
            console.log("  ⚠️ No main photo to upload");
          }

          // Add gallery images
          if (gallery.length > 0) {
            gallery.forEach((g, i) => {
              if (!g.uri) {
                console.log(`  ⚠️ Skipping gallery image ${i} - no URI`);
                return;
              }
              const galleryData = {
                uri: Platform.OS === "android" ? g.uri : g.uri.replace("file://", ""),
                type: g.type || "image/jpeg",
                name: g.fileName || `gallery_${i}_${Date.now()}.jpg`,
              };
              fd.append("galleryImages[]", galleryData as any);
              console.log(`  ✅ Added gallery image ${i + 1}: ${galleryData.name}`);
            });
            console.log(`  ✅ Total gallery images: ${gallery.length}`);
          } else {
            console.log("  ⚠️ No gallery images to upload");
          }

          console.log("🔄 Submitting registration to API...");
          console.log(`   URL: ${API_URL}`);
          console.log(`   Method: POST`);
          console.log(`   FormData entries: ${Object.keys(formState).length + (mainPhoto ? 1 : 0) + gallery.length} fields`);
          
          const res = await fetch(API_URL, {
            method: "POST",
            headers: {
              Accept: "application/json",
              // Don't set Content-Type - let fetch set it automatically for FormData
            },
            body: fd,
          });

          console.log(`📡 API Response Status: ${res.status} ${res.statusText}`);
          const json = await res.json().catch((err) => {
            console.error("❌ Failed to parse JSON response:", err);
            return {};
          });
          console.log("✅ Registration API Response:", JSON.stringify(json, null, 2));

          if (!res.ok) {
            console.error("❌ Registration failed:", json.message || `Status ${res.status}`);
            const errorMsg = json.message || `Server error (Status: ${res.status})`;
            Alert.alert(
              "Upload Failed",
              `${errorMsg}\n\nCheck console logs for details.`,
              [{ text: "OK" }]
            );
          } else {
            console.log("✅ Registration successful! Navigating to Login...");
            const successMsg = json.message || "Registered successfully!";
            const uploadSummary = [
              `✓ Form data submitted`,
              mainPhoto ? `✓ Main photo uploaded (${mainPhoto.fileName || "photo"})` : `⚠ No main photo`,
              gallery.length > 0 ? `✓ ${gallery.length} gallery image(s) uploaded` : `⚠ No gallery images`,
              location ? `✓ Location: ${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}` : `⚠ No location`,
            ].join("\n");
            
            console.log("📊 Upload Summary:\n" + uploadSummary);
            
            Alert.alert(
              "Success! ✅",
              `${successMsg}\n\n${uploadSummary}\n\nRedirecting to login...`,
              [
                {
                  text: "OK",
                  onPress: () => {
                    // Navigate to Login screen with credentials
                    navigation.navigate("Login", {
                      email: formState.email,
                      password: formState.password,
                    });
                    
                    // reset form
                    setFormState({
                      username: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                      garageName: "",
                      description: "",
                      category: "",
                      phone: "",
                      whatsapp: "",
                      emailAddress: "",
                      website: "",
                      localAddress: "",
                    });

                    setMainPhoto(null);
                    setGallery([]);
                    setLocation(null);
                    setSelectedServices(
                      Object.keys(SERVICES).reduce((acc, key) => {
                        acc[key as keyof typeof SERVICES] = new Set<string>();
                        return acc;
                      }, {} as ServicesState)
                    );
                  },
                },
              ]
            );
          }
        } catch (error) {
          console.error("submit error", error);
          const message = error instanceof Error ? error.message : "Failed to submit";
          Alert.alert("Error", message);
        } finally {
          setUploading(false);
        }
    } catch (err) {
        const message = err instanceof Error ? err.message : "Validation failed";
        Alert.alert("Error", message);
  }
};

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>
      <Text style={styles.title}>Register Your Workshop</Text>

      {/* Login Information */}
      <FormSection title="Login Information">
        <View style={styles.row}>
          <TextInput
            placeholder="Username *"
            style={styles.inputHalf}
            value={formState.username}
            onChangeText={(t) => handleChange("username", t)}
          />
          <TextInput
            placeholder="Email *"
            style={styles.inputHalf}
            keyboardType="email-address"
            value={formState.email}
            onChangeText={(t) => handleChange("email", t)}
          />
        </View>
        <View style={styles.row}>
          <TextInput
            placeholder="Password *"
            style={styles.inputHalf}
            secureTextEntry
            value={formState.password}
            onChangeText={(t) => handleChange("password", t)}
          />
          <TextInput
            placeholder="Confirm Password *"
            style={styles.inputHalf}
            secureTextEntry
            value={formState.confirmPassword}
            onChangeText={(t) => handleChange("confirmPassword", t)}
          />
        </View>
      </FormSection>

      {/* Business Information */}
      <FormSection title="Business Information">
        <TextInput
          placeholder="Garage Name *"
          style={styles.input}
          value={formState.garageName}
          onChangeText={(t) => handleChange("garageName", t)}
        />
        <TextInput
          placeholder="Description *"
          style={[styles.input, { height: 100 }]}
          multiline
          value={formState.description}
          onChangeText={(t) => handleChange("description", t)}
        />
        <TextInput
          placeholder="Category (e.g. Repair / Car Wash / Painting)"
          style={styles.input}
          value={formState.category}
          onChangeText={(t) => handleChange("category", t)}
        />

        <Text style={styles.label}>Business Photo {mainPhoto ? "✅" : ""}</Text>
         <TouchableOpacity style={styles.uploadBox} onPress={pickMainPhoto}>
          {mainPhoto?.uri ? (
            <View style={{ alignItems: "center" }}>
              <Image source={{ uri: mainPhoto.uri }} style={{ width: 120, height: 120, borderRadius: 6 }} />
              <Text style={{ color: "#dc2626", marginTop: 5, fontSize: 12 }}>
                ✓ {mainPhoto.fileName || "Photo selected"}
              </Text>
            </View>
          ) : (
            <Text style={{ color: "#666" }}>📸 Upload Business Photo (PNG/JPG)</Text>
          )}
        </TouchableOpacity>

        <View style={{ height: 12 }} />

        <Text style={styles.label}>Gallery Images (max 10) {gallery.length > 0 ? `✅ ${gallery.length}` : ""}</Text>
        <TouchableOpacity style={styles.smallBtn} onPress={pickGalleryImages}>
          <Text style={{ color: "#fff" }}>+ Add Gallery Images {gallery.length > 0 ? `(${gallery.length} selected)` : ""}</Text>
        </TouchableOpacity>

        <ScrollView horizontal style={{ marginTop: 12 }} showsHorizontalScrollIndicator={false}>
          {gallery.length === 0 ? (
            <Text style={{ color: "#777" }}>No gallery images added.</Text>
          ) : (
            gallery.map((g, i) => (
              <View key={`${g.fileName ?? g.uri ?? i}`} style={{ marginRight: 10, alignItems: "center" }}>
                {g.uri ? (
                  <Image source={{ uri: g.uri }} style={{ width: 90, height: 90, borderRadius: 6 }} />
                ) : (
                  <View style={styles.emptyImage}>
                    <Text style={{ color: "#999" }}>No preview</Text>
                  </View>
                )}
                <TouchableOpacity onPress={() => removeGalleryAt(i)} style={styles.removeBadge}>
                  <Text style={{ color: "#fff", fontSize: 12 }}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>
      </FormSection>

      {/* Location Information */}
      <FormSection title="Location Information">
        <TextInput
          placeholder="Local Address"
          style={styles.input}
          value={formState.localAddress}
          onChangeText={(t) => handleChange("localAddress", t)}
        />
        <TouchableOpacity style={styles.locBtn} onPress={useCurrentLocation} disabled={gettingLocation}>
          {gettingLocation ? <ActivityIndicator color="#fff" /> : <Text style={{ color: "#fff" }}>📍 Use Current Location</Text>}
        </TouchableOpacity>

        <View style={{ height: 12 }} />

        {location ? (
          <View style={{ height: 180, borderRadius: 8, overflow: "hidden" }}>
            <MapView
              key={`${location.latitude}-${location.longitude}`}
              style={{ flex: 1 }}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker coordinate={location} />
            </MapView>
          </View>
        ) : (
          <View style={styles.mapPlaceholder}>
            <Text style={{ color: "#777" }}>Map preview will appear after selecting current location.</Text>
          </View>
        )}
      </FormSection>

      {/* Contact Information */}
      <FormSection title="Contact Information">
        <View style={styles.row}>
          <TextInput
            placeholder="Phone Number *"
            style={styles.inputHalf}
            keyboardType="phone-pad"
            value={formState.phone}
            onChangeText={(t) => handleChange("phone", t)}
          />
          <TextInput
            placeholder="WhatsApp Number"
            style={styles.inputHalf}
            keyboardType="phone-pad"
            value={formState.whatsapp}
            onChangeText={(t) => handleChange("whatsapp", t)}
          />
        </View>
        <View style={styles.row}>
          <TextInput
            placeholder="Email Address"
            style={styles.inputHalf}
            keyboardType="email-address"
            value={formState.emailAddress}
            onChangeText={(t) => handleChange("emailAddress", t)}
          />
          <TextInput
            placeholder="Website URL"
            style={styles.inputHalf}
            value={formState.website}
            onChangeText={(t) => handleChange("website", t)}
          />
        </View>
      </FormSection>

       {/* Services Section */}
      <FormSection title="Services">
        {serviceGroupKeys.map((group) => (
          <View key={group} style={{ marginBottom: 12 }}>
            <Text style={{ fontWeight: "700", marginBottom: 8 }}>{group}</Text>
            {SERVICES[group].map((s) => (
              <View key={s} style={styles.checkboxRow}>
                <CheckBox
                  value={selectedServices[group as ServiceGroupKey]?.has(s) ?? false}
                  onValueChange={() => toggleService(group as ServiceGroupKey, s)}
                  tintColors={{ true: "#dc2626", false: "#999" }}
                />
                <Text>{s}</Text>
              </View>
            ))}
          </View>
        ))}
      </FormSection>
 
      {/* Open Hours */}
      <FormSection title="Open Hours">
        {Object.keys(openingHours).map((day) => (
          <View key={day} style={styles.checkboxRow}>
            <Text style={{ width: 90 }}>{day}</Text>
            <TextInput
              placeholder="09:00-12:00, 17:00-20:00"
              value={openingHours[day]}
              onChangeText={(t) => setOpeningHours((p) => ({ ...p, [day]: t }))}
              style={[styles.input, { flex: 1 }]}
            />
          </View>
        ))}
      </FormSection>

      {/*Other Information */}
      <FormSection title="Other Information">
        {OTHER_INFO.map((info) => (
          <View key={info} style={styles.checkboxRow}>
            <CheckBox
              value={otherInfo.has(info)}
              onValueChange={() => setOtherInfo((prev) => toggleSet(prev, info))}
            />
            <Text>{info}</Text>
          </View>
        ))}
      </FormSection>

      {/*Parking Facilities */}
      <FormSection title="Parking Facilities">
        {PARKING.map((p) => (
          <View key={p} style={styles.checkboxRow}>
            <CheckBox
              value={parking.has(p)}
              onValueChange={() => setParking((prev) => toggleSet(prev, p))}
            />
            <Text>{p}</Text>
          </View>
        ))}
      </FormSection>

      {/*Payment Options */}
      <FormSection title="Payment Options">
        {PAYMENTS.map((p) => (
          <View key={p} style={styles.checkboxRow}>
            <CheckBox
              value={payments.has(p)}
              onValueChange={() => setPayments((prev) => toggleSet(prev, p))}
            />
            <Text>{p}</Text>
          </View>
        ))}
      </FormSection>

      {/*Media Links */}
      <FormSection title="Social Media Links (Optional)">
        <TextInput
          placeholder="Facebook URL"
          style={styles.input}
          value={socialLinks.facebook}
          onChangeText={(t) => setSocialLinks((p) => ({ ...p, facebook: t }))}
        />
        <TextInput
          placeholder="Instagram URL"
          style={styles.input}
          value={socialLinks.instagram}
          onChangeText={(t) => setSocialLinks((p) => ({ ...p, instagram: t }))}
        />
        <TextInput
          placeholder="Twitter URL"
          style={styles.input}
          value={socialLinks.twitter}
          onChangeText={(t) => setSocialLinks((p) => ({ ...p, twitter: t }))}
        />
        <TextInput
          placeholder="YouTube URL"
          style={styles.input}
          value={socialLinks.youtube}
          onChangeText={(t) => setSocialLinks((p) => ({ ...p, youtube: t }))}
        />
      </FormSection>

      <View style={styles.checkboxRow}>
        <CheckBox value={agreeTerms} onValueChange={setAgreeTerms} />
        <Text>I agree to the terms and conditions *</Text>
      </View>

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} disabled={uploading}>
        {uploading ? (
          <View style={{ alignItems: "center" }}>
            <ActivityIndicator color="#fff" />
            <Text style={{ color: "#fff", marginTop: 5, fontSize: 12 }}>
              Uploading to API...
            </Text>
          </View>
        ) : (
          <Text style={styles.submitText}>Submit Garage Registration</Text>
        )}
      </TouchableOpacity>
      
      {uploading && (
        <View style={{ padding: 10, backgroundColor: "#f0f7ff", borderRadius: 8, marginTop: 10 }}>
          <Text style={{ color: "#0066cc", fontSize: 12, textAlign: "center" }}>
            📡 Sending data to server... Please wait
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6", padding: 16, paddingTop: 20 },
  title: { fontSize: 22, fontWeight: "700", color: "#111", textAlign: "center", marginBottom: 16 },
  sectionContainer: { marginBottom: 16, borderRadius: 8, overflow: "hidden", backgroundColor: "#fff", elevation: 2 },
  sectionHeader: { backgroundColor: "#dc2626", padding: 12 },
  sectionTitle: { fontSize: 17, color: "#fff", fontWeight: "600" },
  sectionBody: { padding: 14 },
  uploadBox: {
    height: 120,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderStyle: "dashed",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  smallBtn: {
    backgroundColor: "#dc2626",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  removeBadge: {
    marginTop: 6,
    backgroundColor: "#dc2626",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  emptyImage: {
    width: 90,
    height: 90,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  mapPlaceholder: {
    height: 180,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  locBtn: {
    backgroundColor: "#dc2626",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
    width: 220,
  },
  label: { fontWeight: "600", marginBottom: 6 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8, flexWrap: "wrap" },
  input: {
    backgroundColor: "#fff",
    borderColor: "#d1d5db",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  inputHalf: {
    backgroundColor: "#fff",
    borderColor: "#d1d5db",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    width: "48%",
  },
   checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
    gap: 8, // 👈 this adds spacing between checkbox and text
  },
  serviceChip: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  serviceChipActive: {
    backgroundColor: "#dc2626",
    borderColor: "#dc2626",
  },
  submitBtn: {
    backgroundColor: "#dc2626",
    paddingVertical: 14,
    borderRadius: 8,
    marginHorizontal: 8,
    marginTop: 8,
  },
  submitText: { color: "#fff", textAlign: "center", fontWeight: "700", fontSize: 16 },
});
