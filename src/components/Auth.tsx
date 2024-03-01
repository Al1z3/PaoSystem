import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState, Image } from 'react-native'
import { supabase } from '../lib/supabase'
import { Button, Input } from 'react-native-elements'

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
      <Image source={require('../Asset/Icon/profile.png')} style={styles.icon} />
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
          inputContainerStyle={styles.inputContainer}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Mots de passe"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Mots de passe"
          autoCapitalize={'none'}
          inputContainerStyle={styles.inputContainer}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Se connecter" disabled={loading} onPress={() => signInWithEmail()} buttonStyle={styles.buttonStyle} titleStyle={styles.buttonTitleStyle}/>
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="S'inscrire" disabled={loading} onPress={() => signUpWithEmail()} buttonStyle={styles.buttonStyle} titleStyle={styles.buttonTitleStyle}/>
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
