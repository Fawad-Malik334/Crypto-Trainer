import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Dimensions, ScrollView, Platform, StatusBar } from 'react-native';
import { LineChart } from 'react-native-chart-kit'; 

import LearnScreen from './LearnScreen';
import CompeteScreen from './CompeteScreen'; 
import ProfileScreen from './ProfileScreen'; 
import StartTradingScreen from '../StartTrading/StartTradingScreen';

const { width } = Dimensions.get('window');

// Dummy data for crypto coins
const cryptoCoins = [
  { id: 'ton', name: 'Toncoin', symbol: 'TON', price: 7.52, change24h: 0.05, changePercent: 0.67, chartData: [0, 20, 45, 28, 80, 99, 43] },
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', price: 68500.23, change24h: -1200.50, changePercent: -1.73, chartData: [100, 50, 20, 80, 10, 40, 90] },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', price: 3800.15, change24h: 35.70, changePercent: 0.95, chartData: [50, 80, 30, 90, 60, 10, 70] },
  { id: 'sol', name: 'Solana', symbol: 'SOL', price: 150.80, change24h: 2.10, changePercent: 1.41, chartData: [20, 70, 40, 10, 80, 30, 60] },
  { id: 'xrp', name: 'XRP', symbol: 'XRP', price: 0.52, change24h: -0.01, changePercent: -1.92, chartData: [90, 40, 70, 20, 50, 80, 10] },
  { id: 'ada', name: 'Cardano', symbol: 'ADA', price: 0.40, change24h: 0.005, changePercent: 1.27, chartData: [10, 60, 30, 80, 20, 70, 40] },
  { id: 'doge', name: 'Dogecoin', symbol: 'DOGE', price: 0.12, change24h: -0.002, changePercent: -1.64, chartData: [80, 20, 50, 10, 90, 40, 70] },
  { id: 'bnb', name: 'BNB', symbol: 'BNB', price: 600.50, change24h: 15.20, changePercent: 2.59, chartData: [30, 60, 90, 50, 20, 70, 40] },
  { id: 'dot', name: 'Polkadot', symbol: 'DOT', price: 7.85, change24h: 0.15, changePercent: 1.95, chartData: [40, 70, 20, 80, 10, 90, 50] },
  { id: 'link', name: 'Chainlink', symbol: 'LINK', price: 14.30, change24h: -0.25, changePercent: -1.72, chartData: [70, 30, 80, 40, 90, 10, 60] },
  { id: 'ltc', name: 'Litecoin', symbol: 'LTC', price: 75.10, change24h: 0.80, changePercent: 1.08, chartData: [60, 10, 90, 20, 70, 30, 80] },
  { id: 'bch', name: 'Bitcoin Cash', symbol: 'BCH', price: 420.00, change24h: -5.50, changePercent: -1.29, chartData: [20, 80, 10, 70, 40, 90, 30] },
  { id: 'uni', name: 'Uniswap', symbol: 'UNI', price: 9.50, change24h: 0.30, changePercent: 3.26, chartData: [10, 90, 40, 70, 20, 80, 50] },
  { id: 'avax', name: 'Avalanche', symbol: 'AVAX', price: 30.25, change24h: -0.75, changePercent: -2.42, chartData: [50, 20, 70, 30, 80, 10, 90] },
  { id: 'matic', name: 'Polygon', symbol: 'MATIC', price: 0.70, change24h: 0.01, changePercent: 1.45, chartData: [90, 40, 10, 60, 30, 80, 20] },
  { id: 'xlm', name: 'Stellar', symbol: 'XLM', price: 0.10, change24h: 0.001, changePercent: 1.01, chartData: [80, 50, 20, 90, 40, 70, 10] },
  { id: 'vet', name: 'VeChain', symbol: 'VET', price: 0.025, change24h: -0.0005, changePercent: -1.96, chartData: [30, 70, 10, 80, 50, 90, 20] },
];

// Dummy data for competitions - now only 3 entries
const competitions = [
  { id: 'quiz1', title: 'SOLANA QUIZ 1.0', joined: 66, timeLeft: '23 hours left', participants: [
    require('../../assets/1.png'), 
    require('../../assets/2.png'), 
    require('../../assets/3.png')  
  ]},
  { id: 'tradecomp', title: 'BITCOIN TRADING CHALLENGE', joined: 120, timeLeft: '5 days left', participants: [
    require('../../assets/4.png'), 
    require('../../assets/5.png'), 
    require('../../assets/6.png')  
  ]},
  { id: 'ethcomp', title: 'ETHEREUM PREDICTION', joined: 85, timeLeft: '1 day left', participants: [
    require('../../assets/7.png'), 
    require('../../assets/8.png'), 
    require('../../assets/9.png')  
  ]},
];

export default function HomeScreen({ navigation }) {

  const [activeTab, setActiveTab] = useState('wallet'); 

  const appIcon = require('../../assets/app.png');
  const walletIcon = require('../../assets/wallet.png');
  const learnIcon = require('../../assets/learn.png');
  const trophyIcon = require('../../assets/trophy.png');
  const profileIcon = require('../../assets/profile.png');

  // Function to render content based on the active tab
  const renderScreenContent = () => {
    switch (activeTab) {
      case 'wallet':
        return (
          <>
            {/* My Wallet Card */}
            <View style={styles.walletCard}>
              <View style={styles.walletHeader}>
                <Text style={styles.walletTitle}>MY WALLET</Text>
                <Text style={styles.myOrders}>MY ORDERS 0</Text>
              </View>
              <Text style={styles.walletAmount}>$1000.00</Text>
              <TouchableOpacity
                style={styles.walletStartTradingButton}
                onPress={() => navigation.navigate('StartTradingScreen')} 
              >
                <Text style={styles.walletStartTradingButtonText}>Start Trading</Text>
              </TouchableOpacity>
            </View>

            {/* Profit and Loss Card */}
            <View style={styles.profitLossCard}>
              <View style={styles.profitLossHeader}>
                <Text style={styles.profitLossTitle}>PROFIT AND LOSS</Text>
                <View style={styles.profitLossPercentageContainer}>
                  <Text style={styles.profitLossPercentageText}>▲0.00%</Text>
                </View>
              </View>
              <Text style={styles.profitLossAmount}>$0.00</Text>
              <View style={styles.chartContainer}>
                <LineChart
                  data={{
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], 
                    datasets: [{
                      data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                      ]
                    }]
                  }}
                  width={width * 0.8} // from react-native
                  height={150}
                  yAxisLabel="$"
                  yAxisSuffix=""
                  yAxisInterval={1} // optional, defaults to 1
                  chartConfig={{
                    backgroundColor: '#3A3A3A',
                    backgroundGradientFrom: '#3A3A3A',
                    backgroundGradientTo: '#3A3A3A',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`, // Green line
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 10
                    },
                    propsForDots: {
                      r: '4',
                      strokeWidth: '2',
                      stroke: '#4CAF50'
                    }
                  }}
                  bezier
                  style={styles.chartStyle}
                />
                <Text style={styles.chartDate}>4 Jul</Text>
              </View>
            </View>
             
              {/* My Holdings Section (New) */}
            <View style={styles.myHoldingsSection}>
              <Text style={styles.myHoldingsSectionTitle}>My holdings</Text>
              <Text style={styles.noHoldingsText}>No holdings yet! Buy your first crypto</Text>
              <TouchableOpacity
                style={styles.myHoldingsStartTradingButton}
                onPress={() => navigation.navigate('StartTradingScreen')} 
              >
                <Text style={styles.myHoldingsStartTradingButtonText}>Start Trading</Text>
              </TouchableOpacity>
            </View>


            {/* Trending coins */}
            <Text style={styles.myHoldingsText}>Trending Coins</Text>

            {/* Crypto Coins List */}
            <View style={styles.cryptoCoinsList}>
              {cryptoCoins.map(coin => (
                <View key={coin.id} style={styles.coinItem}>
                  <View style={styles.coinInfo}>
                    <Text style={styles.coinSymbol}>{coin.symbol}</Text>
                    <Text style={styles.coinName}>{coin.name}</Text>
                  </View>
                  <View style={styles.coinPriceContainer}>
                    <Text style={styles.coinPrice}>${coin.price.toFixed(2)}</Text>
                    <Text style={[
                      styles.coinChange,
                      coin.changePercent >= 0 ? styles.positiveChange : styles.negativeChange
                    ]}>
                      {coin.changePercent >= 0 ? '▲' : '▼'}{coin.changePercent.toFixed(2)}% (${coin.change24h.toFixed(2)})
                    </Text>
                  </View>
                  <View style={styles.miniChartPlaceholder}>
                    <LineChart
                      data={{
                        labels: [], // No labels for mini chart
                        datasets: [{ data: coin.chartData }]
                      }}
                      width={width * 0.25} // Smaller width for mini chart
                      height={40}
                      chartConfig={{
                        backgroundColor: 'transparent',
                        backgroundGradientFrom: 'transparent',
                        backgroundGradientTo: 'transparent',
                        decimalPlaces: 2,
                        color: (opacity = 1) => (coin.changePercent >= 0 ? `rgba(76, 175, 80, ${opacity})` : `rgba(244, 67, 54, ${opacity})`), // Green for positive, red for negative
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        propsForDots: { r: '0' }, // No dots for mini chart
                      }}
                      bezier
                      withVerticalLabels={false}
                      withHorizontalLabels={false}
                      withInnerLines={false}
                      withOuterLines={false}
                      style={{ paddingRight: 0, marginHorizontal: -10 }} // Adjust padding to fit
                    />
                  </View>
                </View>
              ))}
            </View>

           
            {/* Top Competitions Header */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Top Competitions</Text>
              <TouchableOpacity onPress={() => setActiveTab('compete')}>
                <Text style={styles.viewAllText}>View all</Text>
              </TouchableOpacity>
            </View>

            {/* Competitions Horizontal Scroll View */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.competitionsScrollViewContent}
            >
              {competitions.map(competition => (
                <TouchableOpacity key={competition.id} style={styles.competitionCard}>
                  <Text style={styles.competitionTitle}>{competition.title}</Text>
                  <View style={styles.competitionDetails}>
                    <Text style={styles.competitionJoined}>{competition.joined} joined</Text>
                    <Text style={styles.competitionTimeLeft}>{competition.timeLeft}</Text>
                  </View>
                  <View style={styles.participantsContainer}>
                    {competition.participants.map((imageSource, index) => (
                      <Image
                        key={index}
                        source={imageSource}
                        style={styles.participantImage}
                        resizeMode="cover"
                        onError={(e) => console.log('Image failed to load:', imageSource, e.nativeEvent.error)}
                      />
                    ))}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* This padding ensures the last content is visible above the bottom navigation */}
            <View style={{ height: 100 }} />
          </>
        );
      case 'learn':
        return <LearnScreen />;
      case 'compete':
        return <CompeteScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.fullContainer}>


      {/* Scrollable Content Area */}
      {/* The main content area that will scroll */}
      <ScrollView style={styles.scrollViewContent} contentContainerStyle={styles.scrollViewContentContainer}>

        {/* Top Bar - remains fixed */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.appIconContainer}>
          <Image source={appIcon} style={styles.appIcon} resizeMode="contain" />
        </TouchableOpacity>
        <View style={styles.topButtonsContainer}>
          <TouchableOpacity style={styles.topButton}>
            <Text style={styles.topButtonText}>🔥 0 days</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topButton}>
            <Text style={styles.topButtonText}>☀️ 0 CT Points</Text>
          </TouchableOpacity>
        </View>
      </View>

        {/* Action Buttons Row - remains fixed */}
<View style={styles.actionButtonsRow}>
  <TouchableOpacity
    style={styles.actionButton}
    onPress={() => navigation.navigate('StartTradingScreen')} // Navigate to StartTradingScreen
  >
    <Text style={styles.actionButtonText}>Start Trading</Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={styles.actionButton}
    onPress={() => navigation.navigate('LearnScreen')} // Navigate to LearnScreen
  >
    <Text style={styles.actionButtonText}>📚 Learn</Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={styles.actionButton}
    onPress={() => navigation.navigate('CompeteScreen')} // Navigate to CompetitionsScreen
  >
    <Text style={styles.actionButtonText}>⚔️ Competitions</Text>
  </TouchableOpacity>
</View>

        {renderScreenContent()}
      </ScrollView>

      {/* Bottom Navigation Bar - fixed at the bottom */}
      <View style={styles.bottomNavBar}>
        {/* Wallet Screen */}
        <TouchableOpacity style={[styles.navItem, activeTab === 'wallet' && styles.navItemActive]} onPress={() => setActiveTab('wallet')}>
          <Image
            source={walletIcon}
            style={[styles.navIcon, activeTab === 'wallet' && styles.navIconActive]}
            resizeMode="contain"
          />
          <Text style={[styles.navLabel, activeTab === 'wallet' && styles.navLabelActive]}>Wallet</Text>
        </TouchableOpacity>

        {/* Learn Screen */}
        <TouchableOpacity style={[styles.navItem, activeTab === 'learn' && styles.navItemActive]} onPress={() => setActiveTab('learn')}>
          <Image
            source={learnIcon}
            style={[styles.navIcon, activeTab === 'learn' && styles.navIconActive]}
            resizeMode="contain"
          />
          <Text style={[styles.navLabel, activeTab === 'learn' && styles.navLabelActive]}>Learn</Text>
        </TouchableOpacity>

        {/* Competitions Screen */}
        <TouchableOpacity style={[styles.navItem, activeTab === 'compete' && styles.navItemActive]} onPress={() => setActiveTab('compete')}>
          <Image
            source={trophyIcon}
            style={[styles.navIcon, activeTab === 'compete' && styles.navIconActive]}
            resizeMode="contain"
          />
          <Text style={[styles.navLabel, activeTab === 'compete' && styles.navLabelActive]}>Compete</Text>
        </TouchableOpacity>

        {/* Profile Screen */}
        <TouchableOpacity style={[styles.navItem, activeTab === 'profile' && styles.navItemActive]} onPress={() => setActiveTab('profile')}>
          <Image
            source={profileIcon}
            style={[styles.navIcon, activeTab === 'profile' && styles.navIconActive]}
            resizeMode="contain"
          />
          <Text style={[styles.navLabel, activeTab === 'profile' && styles.navLabelActive]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: '#1A1A1A', // Dark background
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center', // Center the top bar
    marginBottom: 20,
    marginTop: 10,
    // Add padding top for SafeAreaView if not already handled by default
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  appIconContainer: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: '#333',
  },
  appIcon: {
    width: 30,
    height: 30,
  },
  topButtonsContainer: {
    flexDirection: 'row',
  },
  topButton: {
    backgroundColor: '#333',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginLeft: 10,
  },
  topButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    alignSelf: 'center', // Center the action buttons
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#333',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  scrollViewContent: {
    flex: 1, // Take up remaining space
  },
  scrollViewContentContainer: {
    alignItems: 'center', // Center content horizontally within the scroll view
    paddingBottom: 100, // Important: Add padding for the fixed bottom nav bar
  },
  walletCard: {
    backgroundColor: '#388E3C', // Dark green
    borderRadius: 15,
    width: '90%',
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  walletTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  myOrders: {
    color: '#fff',
    fontSize: 14,
  },
  walletAmount: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  walletStartTradingButton: {
    backgroundColor: '#66BB6A', // Lighter green
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignSelf: 'flex-start',
  },
  walletStartTradingButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  profitLossCard: {
    backgroundColor: '#2A2A2A', // Darker background for this card
    borderRadius: 15,
    width: '90%',
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
  },
  profitLossHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  profitLossTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  profitLossPercentageContainer: {
    backgroundColor: '#4CAF50', // Green background for percentage
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  profitLossPercentageText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  profitLossAmount: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  chartStyle: {
    borderRadius: 10,
  },
  chartDate: {
    color: '#888',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginTop: 5,
    marginLeft: width * 0.05, // Align with card padding
  },
  myHoldingsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    alignSelf: 'flex-start',
    marginLeft: width * 0.05,
    marginBottom: 15,
  },
  cryptoCoinsList: {
    width: '90%',
    // No specific height, let it expand with content
  },
  coinItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  coinInfo: {
    flex: 1,
    flexDirection: 'column',
  },
  coinSymbol: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  coinName: {
    color: '#aaa',
    fontSize: 12,
  },
  coinPriceContainer: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
  coinPrice: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  coinChange: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  positiveChange: {
    color: '#4CAF50', // Green
  },
  negativeChange: {
    color: '#F44336', // Red
  },
  miniChartPlaceholder: {
    width: width * 0.25, // Adjusted width for mini chart
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Ensure chart stays within bounds
  },
  // New styles for My Holdings section
  myHoldingsSection: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
  },
  myHoldingsSectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  noHoldingsText: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  myHoldingsStartTradingButton: {
    backgroundColor: '#66BB6A', // Lighter green
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  myHoldingsStartTradingButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // End new styles for My Holdings section
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    width: '100%',
    height: 70,
    position: 'absolute', // Stick to the bottom
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    paddingBottom: Platform.OS === 'ios' ? 10 : 0, // Adjust for iPhone X series bottom safe area
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  navItemActive: {
    // Optional: Add a subtle background highlight for the active item container
    // backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
  },
  navIcon: {
    width: 30,
    height: 30,
    // Original background and border radius for icons
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
    marginBottom: 5,
    tintColor: '#888', // Default tint for inactive icons
  },
  navIconActive: {
    tintColor: '#FFC107', // Highlight color for active icon (e.g., yellow/gold)
    backgroundColor: '#333', // Darker background for active icon
    borderWidth: 1,
    borderColor: '#FFC107',
  },
  navLabel: {
    color: '#888', // Default color for inactive labels
    fontSize: 10,
    marginTop: 2,
  },
  navLabelActive: {
    color: '#FFC107', // Highlight color for active label
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  viewAllText: {
    color: '#FFC107', // Highlight color for "View all"
    fontSize: 14,
    fontWeight: 'bold',
  },
  competitionsScrollViewContent: {
    paddingHorizontal: width * 0.05, // Match padding of other sections
    paddingBottom: 20, // Add some space below cards
  },
  competitionCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    padding: 15,
    marginRight: 15, // Space between cards
    width: width * 0.8, // Adjust width as needed for card size
    height: 180, // Increased height for the card. ADJUST THIS VALUE TO YOUR PREFERENCE
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
    justifyContent: 'space-around', // Distribute content vertically more evenly
  },
  competitionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  competitionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  competitionJoined: {
    color: '#aaa',
    fontSize: 12,
  },
  competitionTimeLeft: {
    color: '#FFC107', // Highlight color for time left
    fontSize: 12,
    fontWeight: 'bold',
  },
  participantsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  participantImage: {
    width: 35,
    height: 35,
    borderRadius: 17.5, // Make them circular (half of width/height)
    borderWidth: 2, // Slightly thicker border
    borderColor: '#3A3A3A', // Changed border color for better visibility against dark background
    marginLeft: -10, // Overlap images more for better visual effect
    backgroundColor: '#555', // Fallback background color if image doesn't load
    overflow: 'hidden', // Ensure image content is clipped to border radius
  },
});
