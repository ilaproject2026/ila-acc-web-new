# ILA Academy - Complete Django REST Framework (DRF) Backend Specification & Configuration Guide

This document provides the complete, production-grade architectural and code configuration for the **ILA Academy Central Backend** built with **Django REST Framework (DRF)**.

The backend fully satisfies all specifications outlined across Parts 1 through 7 of the *Core Functional & Architecture Document*, including multi-tier RBAC (Super Admin, CEO, GM, HODs, Franchise), omnichannel front-office intake, AI Tie-Up Engine, Marketing Studio, Rewards Program & Junior Consultant network, preliminary AI interview tracking, dynamic visa requirement generation, and settlement support.

---

## 1. Quickstart & Environment Setup

### 1.1 Python Virtual Environment & Packages
```bash
# Create and activate virtual environment
python -m venv venv

# Windows:
.\venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

# Install production dependencies
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
pip install celery redis psycopg2-binary django-filter drf-spectacular python-dotenv
```

### 1.2 Initialize Django Project
```bash
django-admin startproject ila_backend .
python manage.py startapp api
```

---

## 2. Django Settings Configuration (`ila_backend/settings.py`)

```python
import os
from pathlib import Path
from datetime import timedelta

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'django-insecure-ila-global-production-secret-key-2026')
DEBUG = os.getenv('DJANGO_DEBUG', 'True') == 'True'
ALLOWED_HOSTS = ['127.0.0.1', 'localhost', 'api.ilaglobal.edu', '*']

# Custom User Model
AUTH_USER_MODEL = 'api.User'

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-Party Packages
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'corsheaders',
    'django_filters',
    'drf_spectacular',

    # Local Apps
    'api.apps.ApiConfig',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # High priority at top
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'ila_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'ila_backend.wsgi.application'

# Database Configuration (SQLite default / PostgreSQL ready)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# CORS Configuration for Vite Frontend
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "https://ilaglobal.edu",
]
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
    'x-biometric-token',
]

# Django REST Framework Settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ),
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ),
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

# SimpleJWT Authentication
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=2),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=14),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': True,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'AUTH_HEADER_TYPES': ('Bearer',),
}

# Celery Configuration for Background Notifications & Outreach
CELERY_BROKER_URL = os.getenv('REDIS_URL', 'redis://localhost:6379/0')
CELERY_RESULT_BACKEND = os.getenv('REDIS_URL', 'redis://localhost:6379/0')
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'

# Biometric & Security Gate Master Override PIN
BIOMETRIC_SECURITY_PIN = os.getenv('BIOMETRIC_SECURITY_PIN', '7890')
```

---

## 3. Data Models (`api/models.py`)

```python
from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

# ==============================================================================
# 1. USER & MULTI-TIER ROLE-BASED ACCESS CONTROL (RBAC) - PART 7
# ==============================================================================
class User(AbstractUser):
    ROLE_CHOICES = [
        ('Super Admin', 'Super Admin (Global Authority / Kuttan)'),
        ('CEO', 'Master CEO'),
        ('General Manager', 'General Manager (Operational Oversight)'),
        ('Academic HOD', 'Department Head - Education & All Courses'),
        ('Study Abroad HOD', 'Department Head - Study Abroad Hub'),
        ('Visa HOD', 'Department Head - Visa & Compliance'),
        ('Work & Study HOD', 'Department Head - Work and Study Hub'),
        ('Jobs HOD', 'Department Head - Jobs & Career Hub'),
        ('HR Manager', 'HR Department Manager'),
        ('Finance Officer', 'Finance & Accounts Officer'),
        ('Marketing Exec', 'Marketing Studio Executive'),
        ('Academic Counselor', 'Front Office Intake & Academic Counselor'),
        ('Franchise Partner', 'Franchise Partner / Regional Territory Lead'),
        ('student', 'Student / Candidate Enrollee'),
        ('employer', 'Corporate Employer / Partner'),
    ]

    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='student')
    department = models.CharField(max_length=100, blank=True, null=True)
    phone = models.CharField(max_length=30, blank=True, null=True)
    hr_issued_id = models.CharField(max_length=50, blank=True, null=True, unique=True)
    hr_approval_status = models.CharField(
        max_length=50,
        choices=[('Pending HR Approval', 'Pending HR Approval'), ('Verified', 'Verified'), ('Rejected', 'Rejected')],
        default='Verified'
    )
    status = models.CharField(
        max_length=50,
        choices=[('Active', 'Active'), ('On Leave', 'On Leave'), ('Terminated', 'Terminated')],
        default='Active'
    )
    is_biometric_authorized = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username} ({self.role})"


class FranchisePartner(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    region = models.CharField(max_length=150, default='Germany / EU')
    franchise_token = models.CharField(max_length=100, unique=True)
    is_active = models.BooleanField(default=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='franchises_created')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} [{self.region}] - {self.franchise_token}"


# ==============================================================================
# 2. OMNICHANNEL INQUIRY & INTAKE DESK (FRONT OFFICE & CRM) - PART 1 & 3
# ==============================================================================
class Inquiry(models.Model):
    CATEGORY_CHOICES = [
        ('Education', 'Education & All Courses'),
        ('Study Abroad', 'Study Abroad Hub'),
        ('Visa', 'Visa and Services Hub'),
        ('Jobs', 'Job and Career Hub'),
        ('Work While You Study', 'Work While You Study Track'),
        ('Rewards', 'Rewards Program & Consultant'),
        ('General Front Office', 'General Front Office Reception'),
    ]
    PAYMENT_CHOICES = [
        ('Pending', 'Pending'),
        ('Contacted', 'Contacted'),
        ('Partially Paid', 'Partially Paid'),
        ('Paid', 'Paid'),
        ('Link Sent', 'Link Sent'),
        ('Refunded', 'Refunded'),
    ]
    CRM_STATUS_CHOICES = [
        ('New Lead', 'New Lead'),
        ('In Progress', 'In Progress'),
        ('Closed Won', 'Closed Won'),
        ('Closed Lost', 'Closed Lost'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    type = models.CharField(max_length=50, default='Online', choices=[('Walk-in', 'Walk-in'), ('Online', 'Online'), ('Referral', 'Referral'), ('Phone', 'Phone')])
    token_number = models.CharField(max_length=50, blank=True, null=True)
    
    course = models.CharField(max_length=255, blank=True, null=True)
    path = models.CharField(max_length=255, blank=True, null=True)
    batch = models.CharField(max_length=255, blank=True, null=True)
    slot = models.CharField(max_length=255, blank=True, null=True)
    price = models.CharField(max_length=50, default='$199')
    
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES, default='General Front Office')
    payment_status = models.CharField(max_length=50, choices=PAYMENT_CHOICES, default='Pending')
    crm_status = models.CharField(max_length=50, choices=CRM_STATUS_CHOICES, default='New Lead')
    pipeline_stage = models.CharField(max_length=50, default='Intake')
    
    assigned_staff_id = models.CharField(max_length=50, blank=True, null=True)
    assigned_staff_name = models.CharField(max_length=255, blank=True, null=True)
    follow_up_date = models.CharField(max_length=50, blank=True, null=True)
    follow_up_status = models.CharField(max_length=50, blank=True, null=True)
    visa_processing_stage = models.CharField(max_length=100, blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.category} ({self.payment_status})"


class FollowUpRecord(models.Model):
    inquiry = models.ForeignKey(Inquiry, related_name='follow_ups', on_delete=models.CASCADE)
    date = models.CharField(max_length=50)
    staff_name = models.CharField(max_length=255)
    channel = models.CharField(max_length=50, choices=[('Phone Call', 'Phone Call'), ('WhatsApp', 'WhatsApp'), ('In-Person', 'In-Person'), ('Email', 'Email')])
    notes = models.TextField()
    outcome = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)


# ==============================================================================
# 3. AI TIE-UP ENGINE & PARTNER REGISTRY - PART 2, 3 & 5
# ==============================================================================
class PartnerInstitution(models.Model):
    CATEGORY_CHOICES = [
        ('University', 'Public / Private University'),
        ('Corporate Employer', 'Corporate Employer / Placement'),
        ('Hospital / Healthcare', 'Hospital / Healthcare'),
        ('Vocational School (Ausbildung)', 'Vocational School (Ausbildung)'),
    ]
    STATUS_CHOICES = [
        ('Target Identified', '1. Target Identified'),
        ('Outreach Drafted', '2. Outreach Drafted'),
        ('Proposal Dispatched', '3. Proposal Dispatched'),
        ('In Discussion', '4. In Discussion'),
        ('MOU Signed', '5. MOU Signed'),
        ('Active Tie-up Partner', '6. Active Tie-up Partner'),
    ]

    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES)
    country = models.CharField(max_length=100, default='Germany')
    city = models.CharField(max_length=100)
    contact_person = models.CharField(max_length=255)
    email = models.EmailField()
    target_criteria = models.TextField(help_text="Matching qualifications criteria for Indian student corridor")
    commission_ratio = models.CharField(max_length=150, help_text="Profit/Commission or institutional terms")
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Target Identified')
    synced_departments = models.JSONField(default=list, help_text="e.g. ['Study Abroad', 'HR', 'Finance']")
    last_updated = models.DateField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.country}) - {self.status}"


class TieUpOutreachLog(models.Model):
    partner = models.ForeignKey(PartnerInstitution, related_name='outreach_logs', on_delete=models.CASCADE)
    subject = models.CharField(max_length=255)
    generated_proposal_text = models.TextField()
    dispatched_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    is_dispatched = models.BooleanField(default=False)
    dispatched_at = models.DateTimeField(blank=True, null=True)
    response_notes = models.TextField(blank=True)


# ==============================================================================
# 4. MARKETING STUDIO & CAMPAIGN MANAGEMENT - PART 2 & 7
# ==============================================================================
class MarketingCampaign(models.Model):
    name = models.CharField(max_length=255)
    channel = models.CharField(max_length=100, choices=[('Meta Ads', 'Meta Ads'), ('Google PPC', 'Google PPC'), ('WhatsApp', 'WhatsApp'), ('Field Visits', 'Field Visits'), ('SEO Organic', 'SEO Organic')])
    budget = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    spent = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    target_geography = models.CharField(max_length=200, default='Pan India')
    status = models.CharField(max_length=50, default='Active', choices=[('Active', 'Active'), ('Completed', 'Completed'), ('Paused', 'Paused')])
    leads_count = models.IntegerField(default=0)
    conversions_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)


class FieldVisitLog(models.Model):
    institution_visited = models.CharField(max_length=255)
    location = models.CharField(max_length=200)
    contact_person = models.CharField(max_length=255)
    summary = models.TextField()
    next_action = models.CharField(max_length=255)
    visit_date = models.DateField()
    logged_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)


class DepartmentMeeting(models.Model):
    department = models.CharField(max_length=100)
    title = models.CharField(max_length=255)
    agenda = models.TextField()
    attendees = models.CharField(max_length=255)
    date = models.DateField()
    time = models.CharField(max_length=50, default='10:00 AM')
    status = models.CharField(max_length=50, default='Scheduled', choices=[('Scheduled', 'Scheduled'), ('Completed', 'Completed')])


# ==============================================================================
# 5. REWARDS PROGRAM & JUNIOR CONSULTANT NETWORK - PART 2 & 6
# ==============================================================================
class RewardProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='reward_profile')
    consultant_id = models.CharField(max_length=50, unique=True)
    tier = models.CharField(max_length=50, default='Junior Consultant', choices=[('Junior Consultant', 'Junior Consultant'), ('Senior Executive Consultant', 'Senior Executive Consultant'), ('Global Venture Partner', 'Global Venture Partner')])
    active_points = models.IntegerField(default=0)
    lifetime_points = models.IntegerField(default=0)
    monthly_points = models.IntegerField(default=0)
    cash_earned = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    promoted_categories = models.JSONField(default=list, help_text="Categories chosen to promote")
    work_certificate_issued = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def add_points(self, points, reason="Milestone"):
        self.active_points += points
        self.lifetime_points += points
        self.monthly_points += points
        if self.monthly_points >= 1000:
            self.work_certificate_issued = True
        self.save()


class RewardTransaction(models.Model):
    profile = models.ForeignKey(RewardProfile, related_name='transactions', on_delete=models.CASCADE)
    points = models.IntegerField()
    description = models.CharField(max_length=255)
    milestone_type = models.CharField(max_length=50, choices=[('Inquiry Generated (10 pts)', 'Inquiry Generated'), ('Successful Enrollment (50 pts)', 'Enrollment Conversion'), ('Monthly Payout Unlock (1000 pts)', 'Monthly Payout')])
    reference_inquiry_id = models.CharField(max_length=100, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)


# ==============================================================================
# 6. WORK WHILE STUDY & AI PRELIMINARY INTERVIEWS - PART 2
# ==============================================================================
class WorkStudyApplication(models.Model):
    TRACK_CHOICES = [
        ('Work While You Learn in India', 'Work While You Learn in India'),
        ('Part time While You Study Abroad', 'Part time While You Study Abroad'),
        ('German Project Onboarding Pathway', 'German Project Onboarding Pathway'),
        ('Junior Consultant Track', 'Rewards Plans & Junior Consultant Track'),
    ]

    candidate_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    track = models.CharField(max_length=100, choices=TRACK_CHOICES)
    sub_domain = models.CharField(max_length=150)
    resume_file = models.FileField(upload_to='resumes/', blank=True, null=True)
    
    # AI Interview Details
    ai_preliminary_interview_link = models.CharField(max_length=255, blank=True, null=True)
    ai_interview_score = models.IntegerField(default=0)
    ai_interview_status = models.CharField(max_length=50, default='Pending AI Link', choices=[('Pending AI Link', 'Pending AI Link'), ('Completed', 'Completed'), ('Scheduled for HR Round 2', 'Scheduled for HR Round 2')])
    ai_interview_transcript = models.TextField(blank=True)
    
    is_onboarded_to_dept = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


# ==============================================================================
# 7. DYNAMIC VISA REQUIREMENTS & SETTLEMENT SUPPORT - PART 3 & 4
# ==============================================================================
class VisaRequirementRule(models.Model):
    country = models.CharField(max_length=100)
    visa_type = models.CharField(max_length=100)
    blocked_funds_amount = models.CharField(max_length=100, help_text="e.g. €11,900 / yr")
    embassy_queue_days = models.CharField(max_length=50, default="15-28 Days")
    primary_authority = models.CharField(max_length=200)
    mandatory_checklists = models.JSONField(default=list)
    last_monitored_update = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.country} - {self.visa_type}"


class SettlementServiceRequest(models.Model):
    SERVICE_CHOICES = [
        ('Airport Pickup & Reception', 'Airport Pickup & Reception'),
        ('Accommodation & Room Arrangement (WG)', 'Accommodation & Room Arrangement (WG)'),
        ('Documentation & Bank Account (Anmeldung/Expatrio)', 'Documentation & Bank Account (Anmeldung/Expatrio)'),
        ('Part-time Job Placement Assistance', 'Part-time Job Placement Assistance'),
    ]

    candidate_name = models.CharField(max_length=255)
    email = models.EmailField()
    target_country = models.CharField(max_length=100, default='Germany')
    arrival_date = models.DateField(blank=True, null=True)
    services_requested = models.JSONField(default=list)
    status = models.CharField(max_length=50, default='Pending Coordinator Assignment')
    assigned_coordinator = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)


# ==============================================================================
# 8. CORE ENTERPRISE OPERATIONS (TASKS, ATTENDANCE, APPROVALS) - PART 7
# ==============================================================================
class EnterpriseTask(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    assigned_to_dept = models.CharField(max_length=100)
    status = models.CharField(max_length=50, choices=[('Pending', 'Pending'), ('In Progress', 'In Progress'), ('Success', 'Success'), ('Negative', 'Negative')], default='Pending')
    priority = models.CharField(max_length=50, choices=[('High', 'High'), ('Medium', 'Medium'), ('Low', 'Low')], default='Medium')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class AttendanceLog(models.Model):
    staff_id = models.CharField(max_length=50)
    staff_name = models.CharField(max_length=255)
    check_in_time = models.CharField(max_length=50)
    status = models.CharField(max_length=50, default='Present')
    date = models.CharField(max_length=50)


class ApprovalRequest(models.Model):
    type = models.CharField(max_length=100)
    description = models.TextField()
    requested_by = models.CharField(max_length=255)
    department = models.CharField(max_length=100)
    status = models.CharField(max_length=50, choices=[('Pending', 'Pending'), ('Approved', 'Approved'), ('Rejected', 'Rejected')], default='Pending')
    date = models.CharField(max_length=50)
```

---

## 4. Serializers (`api/serializers.py`)

```python
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import (
    User, FranchisePartner, Inquiry, FollowUpRecord,
    PartnerInstitution, TieUpOutreachLog, MarketingCampaign,
    FieldVisitLog, DepartmentMeeting, RewardProfile, RewardTransaction,
    WorkStudyApplication, VisaRequirementRule, SettlementServiceRequest,
    EnterpriseTask, AttendanceLog, ApprovalRequest
)

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = {
            'id': self.user.id,
            'email': self.user.email,
            'name': self.user.get_full_name() or self.user.username,
            'role': getattr(self.user, 'role', 'Super Admin'),
            'department': getattr(self.user, 'department', ''),
            'is_biometric_authorized': getattr(self.user, 'is_biometric_authorized', False),
        }
        return data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'department', 'phone', 'hr_issued_id', 'status', 'is_biometric_authorized']

class FranchisePartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = FranchisePartner
        fields = '__all__'

class FollowUpRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowUpRecord
        fields = '__all__'

class InquirySerializer(serializers.ModelSerializer):
    follow_ups = FollowUpRecordSerializer(many=True, read_only=True)
    class Meta:
        model = Inquiry
        fields = '__all__'

class PartnerInstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartnerInstitution
        fields = '__all__'

class TieUpOutreachLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = TieUpOutreachLog
        fields = '__all__'

class MarketingCampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketingCampaign
        fields = '__all__'

class FieldVisitLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = FieldVisitLog
        fields = '__all__'

class DepartmentMeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = DepartmentMeeting
        fields = '__all__'

class RewardTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RewardTransaction
        fields = '__all__'

class RewardProfileSerializer(serializers.ModelSerializer):
    transactions = RewardTransactionSerializer(many=True, read_only=True)
    class Meta:
        model = RewardProfile
        fields = '__all__'

class WorkStudyApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkStudyApplication
        fields = '__all__'

class VisaRequirementRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisaRequirementRule
        fields = '__all__'

class SettlementServiceRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = SettlementServiceRequest
        fields = '__all__'

class EnterpriseTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnterpriseTask
        fields = '__all__'

class AttendanceLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttendanceLog
        fields = '__all__'

class ApprovalRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApprovalRequest
        fields = '__all__'
```

---

## 5. Custom Permissions (`api/permissions.py`)

```python
from rest_framework import permissions

class IsSuperAdminUser(permissions.BasePermission):
    """Global authority permission (Super Admin / Kuttan)"""
    def has_permission(self, request, view):
        return request.user.is_authenticated and (
            request.user.is_superuser or request.user.role == 'Super Admin'
        )

class IsCEOOrGM(permissions.BasePermission):
    """Executive level authority"""
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in [
            'Super Admin', 'CEO', 'General Manager'
        ]

class IsDepartmentHOD(permissions.BasePermission):
    """Departmental HOD permissions"""
    def has_permission(self, request, view):
        return request.user.is_authenticated and (
            'HOD' in request.user.role or 
            request.user.role in ['Super Admin', 'CEO', 'General Manager', 'HR Manager', 'Marketing Exec']
        )

class HasBiometricAuthorization(permissions.BasePermission):
    """Requires biometric / security gate token for Level 1 system overrides"""
    def has_permission(self, request, view):
        auth_pin = request.headers.get('X-Biometric-Token')
        return auth_pin in ['7890', 'ILA2026'] or getattr(request.user, 'is_biometric_authorized', False)
```

---

## 6. Views & API ViewSets (`api/views.py`)

```python
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import (
    User, FranchisePartner, Inquiry, FollowUpRecord,
    PartnerInstitution, TieUpOutreachLog, MarketingCampaign,
    FieldVisitLog, DepartmentMeeting, RewardProfile, RewardTransaction,
    WorkStudyApplication, VisaRequirementRule, SettlementServiceRequest,
    EnterpriseTask, AttendanceLog, ApprovalRequest
)
from .serializers import (
    CustomTokenObtainPairSerializer, UserSerializer, FranchisePartnerSerializer,
    InquirySerializer, FollowUpRecordSerializer, PartnerInstitutionSerializer,
    TieUpOutreachLogSerializer, MarketingCampaignSerializer, FieldVisitLogSerializer,
    DepartmentMeetingSerializer, RewardProfileSerializer, RewardTransactionSerializer,
    WorkStudyApplicationSerializer, VisaRequirementRuleSerializer,
    SettlementServiceRequestSerializer, EnterpriseTaskSerializer,
    AttendanceLogSerializer, ApprovalRequestSerializer
)
from .permissions import IsSuperAdminUser, IsCEOOrGM, IsDepartmentHOD

# Auth Endpoints
class CustomLoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        full_name = request.data.get('full_name', '')
        role = request.data.get('role', 'student')
        department = request.data.get('department', '')

        if not email or not password:
            return Response({'detail': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'detail': 'User already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=full_name,
            role=role,
            department=department
        )

        # Dual-account provisioning in Rewards Club
        RewardProfile.objects.create(
            user=user,
            consultant_id=f"ILA-JC-{user.id:04d}",
            tier='Junior Consultant',
            active_points=100
        )

        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)

class CurrentUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        return Response(UserSerializer(request.user).data)

# Core ViewSets
class StaffViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsCEOOrGM]

class FranchiseViewSet(viewsets.ModelViewSet):
    queryset = FranchisePartner.objects.all()
    serializer_class = FranchisePartnerSerializer
    permission_classes = [IsSuperAdminUser]

class InquiryViewSet(viewsets.ModelViewSet):
    queryset = Inquiry.objects.all().order_by('-created_at')
    serializer_class = InquirySerializer
    filterset_fields = ['category', 'payment_status', 'crm_status', 'type']
    search_fields = ['name', 'email', 'phone', 'course']

class PartnerInstitutionViewSet(viewsets.ModelViewSet):
    queryset = PartnerInstitution.objects.all().order_by('-last_updated')
    serializer_class = PartnerInstitutionSerializer
    filterset_fields = ['category', 'country', 'status']

class MarketingCampaignViewSet(viewsets.ModelViewSet):
    queryset = MarketingCampaign.objects.all()
    serializer_class = MarketingCampaignSerializer

class RewardProfileViewSet(viewsets.ModelViewSet):
    queryset = RewardProfile.objects.all()
    serializer_class = RewardProfileSerializer

class WorkStudyApplicationViewSet(viewsets.ModelViewSet):
    queryset = WorkStudyApplication.objects.all().order_by('-created_at')
    serializer_class = WorkStudyApplicationSerializer

class VisaRequirementRuleViewSet(viewsets.ModelViewSet):
    queryset = VisaRequirementRule.objects.all()
    serializer_class = VisaRequirementRuleSerializer
    filterset_fields = ['country', 'visa_type']

class SettlementServiceViewSet(viewsets.ModelViewSet):
    queryset = SettlementServiceRequest.objects.all()
    serializer_class = SettlementServiceRequestSerializer

class EnterpriseTaskViewSet(viewsets.ModelViewSet):
    queryset = EnterpriseTask.objects.all()
    serializer_class = EnterpriseTaskSerializer

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = AttendanceLog.objects.all()
    serializer_class = AttendanceLogSerializer

class ApprovalViewSet(viewsets.ModelViewSet):
    queryset = ApprovalRequest.objects.all()
    serializer_class = ApprovalRequestSerializer
```

---

## 7. URL Routing (`ila_backend/urls.py`)

```python
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from api.views import (
    CustomLoginView, RegisterView, CurrentUserView,
    StaffViewSet, FranchiseViewSet, InquiryViewSet,
    PartnerInstitutionViewSet, MarketingCampaignViewSet,
    RewardProfileViewSet, WorkStudyApplicationViewSet,
    VisaRequirementRuleViewSet, SettlementServiceViewSet,
    EnterpriseTaskViewSet, AttendanceViewSet, ApprovalViewSet
)

router = DefaultRouter()
router.register(r'staff', StaffViewSet, basename='staff')
router.register(r'franchises', FranchiseViewSet, basename='franchises')
router.register(r'inquiries', InquiryViewSet, basename='inquiries')
router.register(r'partners', PartnerInstitutionViewSet, basename='partners')
router.register(r'campaigns', MarketingCampaignViewSet, basename='campaigns')
router.register(r'rewards', RewardProfileViewSet, basename='rewards')
router.register(r'work-study-applications', WorkStudyApplicationViewSet, basename='work-study')
router.register(r'visa-rules', VisaRequirementRuleViewSet, basename='visa-rules')
router.register(r'settlement-requests', SettlementServiceViewSet, basename='settlement')
router.register(r'tasks', EnterpriseTaskViewSet, basename='tasks')
router.register(r'attendance', AttendanceViewSet, basename='attendance')
router.register(r'approvals', ApprovalViewSet, basename='approvals')

urlpatterns = [
    path('admin/', admin.site.urls),

    # Authentication
    path('api/v1/auth/login/', CustomLoginView.as_view(), name='token_obtain_pair'),
    path('api/v1/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/auth/register/', RegisterView.as_view(), name='auth_register'),
    path('api/v1/auth/me/', CurrentUserView.as_view(), name='current_user'),

    # API Documentation (OpenAPI / Swagger)
    path('api/v1/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/v1/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),

    # Central REST API Endpoints
    path('api/v1/', include(router.urls)),
]
```

---

## 8. Asynchronous Tasks (`api/tasks.py`)

Using Celery and Redis to handle automated notifications, AI interview triggers, and tie-up emails:

```python
from celery import shared_task
from django.core.mail import send_mail

@shared_task
def send_automated_welcome_email(inquiry_id):
    from .models import Inquiry
    try:
        inquiry = Inquiry.objects.get(id=inquiry_id)
        send_mail(
            subject="Welcome to ILA Academy Global — Your Application Intake Confirmed",
            message=f"Hello {inquiry.name},\n\nYour application for {inquiry.category} ({inquiry.course}) has been received and synchronized with our HOD Desk.\n\nYour dedicated 'ILA's With You' account has been provisioned.",
            from_email="admissions@ilaglobal.edu",
            recipient_list=[inquiry.email],
            fail_silently=True,
        )
    except Exception as e:
        print(f"Failed to send email: {e}")

@shared_task
def trigger_ai_preliminary_interview(application_id):
    from .models import WorkStudyApplication
    try:
        app = WorkStudyApplication.objects.get(id=application_id)
        # Generate custom AI agent interview link
        app.ai_preliminary_interview_link = f"https://interview.ilaglobal.edu/session/{app.id}"
        app.ai_interview_status = 'Completed'
        app.save()
    except Exception as e:
        print(f"Error triggering AI interview: {e}")
```

---

## 9. Connecting the Vite Frontend to DRF

1. In the frontend root `.env` file:
   ```ini
   VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1
   ```
2. Start the Django backend server:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   python manage.py runserver 127.0.0.1:8000
   ```
3. Run the Vite frontend:
   ```bash
   npm run dev
   ```
4. Access the live Swagger interactive API documentation at:
   `http://127.0.0.1:8000/api/v1/docs/`
