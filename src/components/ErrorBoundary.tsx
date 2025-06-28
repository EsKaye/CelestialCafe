import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>✨ Cosmic Disturbance Detected ✨</Text>
          <Text style={styles.message}>
            A rift in the space-time continuum has occurred. Our cosmic baristas are working to restore harmony.
          </Text>
          <Text style={styles.errorText}>{this.state.error?.message}</Text>
          <TouchableOpacity style={styles.button} onPress={this.handleReset}>
            <Text style={styles.buttonText}>Restore Cosmic Balance</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgrounds.main,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.primary.bold,
    color: colors.text.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    fontFamily: fonts.primary.regular,
    color: colors.text.secondary,
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 24,
  },
  errorText: {
    fontSize: 14,
    fontFamily: fonts.primary.mono,
    color: colors.ui.error,
    marginBottom: 30,
    textAlign: 'center',
    opacity: 0.8,
  },
  button: {
    backgroundColor: colors.cosmic.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 3,
    shadowColor: colors.effects.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: colors.text.primary,
    fontSize: 16,
    fontFamily: fonts.primary.medium,
  },
}); 