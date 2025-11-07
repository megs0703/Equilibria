import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../context/AuthContext';
import { nutritionAPI, waterAPI } from '../utils/api';

const DashboardScreen = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    todayCalories: 0,
    calorieGoal: 2000,
    waterIntake: 0,
    waterGoal: 8,
    proteinIntake: 0,
    proteinGoal: 150,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [nutritionRes, waterRes] = await Promise.all([
        nutritionAPI.getTodayLog(),
        waterAPI.getTodayLog(),
      ]);

      setStats(prev => ({
        ...prev,
        todayCalories: nutritionRes.data.totalCalories || 0,
        waterIntake: waterRes.data.glasses || 0,
        waterGoal: waterRes.data.goal || 8,
        proteinIntake: nutritionRes.data.totalProtein || 0,
      }));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const StatCard = ({ title, value, goal, icon, color, unit = '' }) => {
    const percentage = goal ? Math.min((value / goal) * 100, 100) : 0;
    
    return (
      <View style={styles.statCard}>
        <View style={styles.statHeader}>
          <View style={[styles.iconContainer, { backgroundColor: color }]}>
            <Icon name={icon} size={24} color="white" />
          </View>
          <View style={styles.statValues}>
            <Text style={styles.statValue}>{value}{unit}</Text>
            {goal && <Text style={styles.statGoal}>of {goal}{unit}</Text>}
          </View>
        </View>
        <Text style={styles.statTitle}>{title}</Text>
        {goal && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[styles.progressFill, { width: `${percentage}%`, backgroundColor: color }]} 
              />
            </View>
            <Text style={styles.progressText}>{percentage.toFixed(0)}%</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#16a34a', '#2563eb']}
          style={styles.header}
        >
          <Text style={styles.greeting}>
            {getGreeting()}, {user?.name}!
          </Text>
          <Text style={styles.subtitle}>
            {user?.gender === 'female' 
              ? 'Ready to balance strength and wellness today?'
              : user?.gender === 'male'
              ? 'Time to build strength and endurance!'
              : 'Ready to achieve your fitness goals?'
            }
          </Text>
          <View style={styles.userInfo}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {user?.role?.replace('_', ' ').toUpperCase()}
              </Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {user?.gender?.toUpperCase()}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard
            title="Calories Today"
            value={stats.todayCalories}
            goal={stats.calorieGoal}
            icon="flame"
            color="#ef4444"
          />
          <StatCard
            title="Water Intake"
            value={stats.waterIntake}
            goal={stats.waterGoal}
            icon="water"
            color="#3b82f6"
            unit=" glasses"
          />
          <StatCard
            title="Protein Intake"
            value={stats.proteinIntake}
            goal={stats.proteinGoal}
            icon="barbell"
            color="#22c55e"
            unit="g"
          />
          <StatCard
            title="Workout Mode"
            value={user?.preferences?.workoutType === 'gym' ? 'Gym' : 'Home'}
            icon="fitness"
            color="#8b5cf6"
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={[styles.actionButton, styles.primaryAction]}>
              <Icon name="restaurant" size={24} color="white" />
              <Text style={styles.actionText}>Log Meal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.secondaryAction]}>
              <Icon name="water" size={24} color="white" />
              <Text style={styles.actionText}>Add Water</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.primaryAction]}>
              <Icon name="fitness" size={24} color="white" />
              <Text style={styles.actionText}>Start Workout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.secondaryAction]}>
              <Icon name="analytics" size={24} color="white" />
              <Text style={styles.actionText}>View Progress</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Today's Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Recommendations</Text>
          <View style={styles.recommendationCard}>
            <View style={styles.recommendation}>
              <View style={[styles.dot, { backgroundColor: '#16a34a' }]} />
              <Text style={styles.recommendationText}>
                {user?.gender === 'female' 
                  ? 'Consider adding yoga or pilates to your routine for flexibility'
                  : 'Focus on compound movements for maximum muscle engagement'
                }
              </Text>
            </View>
            <View style={styles.recommendation}>
              <View style={[styles.dot, { backgroundColor: '#2563eb' }]} />
              <Text style={styles.recommendationText}>
                Aim for {Math.round((user?.weight || 70) * 1.6)}g of protein today based on your weight
              </Text>
            </View>
            <View style={styles.recommendation}>
              <View style={[styles.dot, { backgroundColor: '#22c55e' }]} />
              <Text style={styles.recommendationText}>
                Stay hydrated! You're {((stats.waterIntake / stats.waterGoal) * 100).toFixed(0)}% 
                towards your daily water goal
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statValues: {
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statGoal: {
    fontSize: 12,
    color: '#6b7280',
  },
  statTitle: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 10,
    color: '#6b7280',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
  },
  primaryAction: {
    backgroundColor: '#16a34a',
  },
  secondaryAction: {
    backgroundColor: '#2563eb',
  },
  actionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
  },
  recommendationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recommendation: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
    marginTop: 6,
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
});

export default DashboardScreen;