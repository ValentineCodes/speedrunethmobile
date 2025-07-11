import { isAddress, JsonRpcProvider } from 'ethers';
import React, { useState } from 'react';
import { Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useModal } from 'react-native-modalfy';
import { Text, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import ethmobileConfig from '../../../../ethmobile.config';
import { Blockie } from '../../../components/eth-mobile';
import { useAccount } from '../../../hooks/eth-mobile';
import { Account } from '../../../store/reducers/Accounts';
import globalStyles from '../../../styles/globalStyles';
import { COLORS } from '../../../utils/constants';
import { isENS } from '../../../utils/eth-mobile';
import { FONT_SIZE } from '../../../utils/styles';

type Props = {
  recipient: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export default function Recipient({ recipient, onChange, onSubmit }: Props) {
  const { openModal } = useModal();

  const accounts: Account[] = useSelector((state: any) => state.accounts);

  const [error, setError] = useState('');

  const account = useAccount();

  const scanQRCode = () => {
    Keyboard.dismiss();
    openModal('QRCodeScanner', {
      onScan: onChange
    });
  };

  const getAddressName = () => {
    const _recipient = accounts.find(
      account => account.address?.toLowerCase() === recipient?.toLowerCase()
    );

    if (!_recipient) return;
    return `(${_recipient.name})`;
  };

  const handleInputChange = async (value: string) => {
    onChange(value);

    if (error) {
      setError('');
    }

    if (isENS(value)) {
      try {
        const provider = new JsonRpcProvider(
          `https://eth-mainnet.alchemyapi.io/v2/${ethmobileConfig.networks.ethereum}`
        );

        const address = await provider.resolveName(value);

        if (address && isAddress(address)) {
          onChange(address);
        } else {
          setError('Invalid ENS');
        }
      } catch (error) {
        setError('Could not resolve ENS');
        return;
      }
    }
  };

  const selectAccount = () => {
    if (accounts.length > 1) {
      openModal('AccountsSelectionModal', {
        selectedAccount: recipient,
        onSelect: (account: Account) => onChange(account.address)
      });
    } else {
      onChange(account.address);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleMedium" style={globalStyles.text}>
          To:
        </Text>
        <TouchableOpacity onPress={selectAccount}>
          <Text style={styles.myAccountText}>
            My account
            <Text style={styles.accountName}>{getAddressName()}</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        value={recipient}
        mode="outlined"
        style={styles.input}
        placeholder="Recipient Address"
        placeholderTextColor="#a3a3a3"
        textColor="black"
        onChangeText={handleInputChange}
        onSubmitEditing={onSubmit}
        left={
          isAddress(recipient) ? (
            <TextInput.Icon
              icon={() => (
                <Blockie address={recipient} size={1.8 * FONT_SIZE['xl']} />
              )}
            />
          ) : null
        }
        right={<TextInput.Icon icon="qrcode-scan" onPress={scanQRCode} />}
        error={!!error}
        outlineStyle={{ borderRadius: 12, borderColor: COLORS.gray }}
        contentStyle={globalStyles.text}
      />
      {error && (
        <Text variant="bodySmall" style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  myAccountText: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.lg,
    ...globalStyles.textMedium,
    marginLeft: 8,
    marginBottom: -2
  },
  accountName: {
    color: 'black',
    ...globalStyles.text,
    fontSize: FONT_SIZE['md']
  },
  input: {
    backgroundColor: '#f5f5f5'
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    ...globalStyles.text
  }
});
