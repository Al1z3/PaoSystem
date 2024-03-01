import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { StyleSheet, View, Alert, Text, Image } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { Session } from '@supabase/supabase-js'


export default function Account({ session }: { session: Session }) {
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState('')
    const [website, setWebsite] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')

    useEffect(() => {
        if (session) getProfile()
    }, [session])

    async function getProfile() {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')

            const { data, error, status } = await supabase
                .from('profiles')
                .select(`username, website, avatar_url`)
                .eq('id', session?.user.id)
                .single()
            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setUsername(data.username)
                setWebsite(data.website)
                setAvatarUrl(data.avatar_url)
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    async function updateProfile({
        username,
        website,
        avatar_url,
    }: {
        username: string
        website: string
        avatar_url: string
    }) {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')

            const updates = {
                id: session?.user.id,
                username,
                website,
                avatar_url,
                updated_at: new Date(),
            }

            const { error } = await supabase.from('profiles').upsert(updates)

            if (error) {
                throw error
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        } finally {
            setLoading(false)
        }


    }



async function deleteProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      // Exemple de requête HTTP DELETE pour supprimer un utilisateur (côté serveur)
      const response = await fetch(
        `https://zdewtlmuxberrnzxgwpi.supabase.co/auth/v1/admin/users/${session?.user.id}`,
        {
          method: "DELETE",
          headers: {
            apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkZXd0bG11eGJlcnJuenhnd3BpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwOTEyNDU2NSwiZXhwIjoyMDI0NzAwNTY1fQ.fcP9M-hAXvFefonlCHXW61bbalJXJw-Av51k1-fz8is",
            authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkZXd0bG11eGJlcnJuenhnd3BpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwOTEyNDU2NSwiZXhwIjoyMDI0NzAwNTY1fQ.fcP9M-hAXvFefonlCHXW61bbalJXJw-Av51k1-fz8is`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("An error occurred while deleting the profile!");
      } else {
        Alert.alert("Profile deleted successssfully!");
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
      //supabase.auth.signOut();
    }
  }



    return (
        <View style={styles.container}>
            <View style={[styles.verticallySpaced, styles.mt20]}>
            <Image source={require('../Asset/Icon/profile.png')} style={styles.icon} />
                <Input label="Email" value={session?.user?.email} disabled inputContainerStyle={styles.inputContainer} />
            </View>
            <View style={styles.verticallySpaced}>
                <Input label="Pseudonyme" value={username || ''} onChangeText={(text) => setUsername(text)} inputContainerStyle={styles.inputContainer} />
            </View>

            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button
                    title={loading ? 'Téléchargements ...' : 'Modifier'}
                    onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })}
                    disabled={loading}
                    buttonStyle={styles.buttonStyle}
                    titleStyle={styles.buttonTitleStyle}
                />
            </View>

            <View style={styles.verticallySpaced}>
                <Button title="Se déconecter" onPress={() => supabase.auth.signOut()} buttonStyle={styles.buttonStyle}
                    titleStyle={styles.buttonTitleStyle} />
            </View>
            <View style={styles.verticallySpaced}>
                <Button title="Se déconecter" onPress={deleteProfile} buttonStyle={styles.buttonStyle}
                    titleStyle={styles.buttonTitleStyle} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Centrer le contenu verticalement
        alignItems: 'center', // Centrer le contenu horizontalement
        backgroundColor: '#BDB0D9', // Couleur de fond légère
        padding: 20, // Espacement autour du conteneur
    },
    verticallySpaced: {
        width: '100%', // Prendre toute la largeur
        marginBottom: 15, // Espacement entre les champs
    },
    inputContainer: {
        paddingHorizontal: 10, // Espacement intérieur horizontal pour les champs Input
        borderRadius: 5, // Bordures arrondies pour les champs Input
        borderWidth: 1, // Épaisseur de la bordure des champs Input
        borderColor: '#d0d0d0', // Couleur de la bordure des champs Input
        backgroundColor: '#fff', // Fond blanc pour les champs Input
    },
    buttonStyle: {
        backgroundColor: '#007bff', // Couleur de fond pour les boutons
        paddingVertical: 10, // Espacement vertical à l'intérieur du bouton
        paddingHorizontal: 20, // Espacement horizontal à l'intérieur du bouton
        borderRadius: 5, // Bordures arrondies pour les boutons
    },
    buttonTitleStyle: {
        color: '#fff', // Couleur du texte pour les boutons
    },
    mt20: {
        marginTop: 20, // Espacement supplémentaire au-dessus de certains éléments
    },
    icon:{
        marginLeft: 100,
        width:150,
        height:150,
        justifyContent: 'center',
        alignItems: 'center',
    }
});