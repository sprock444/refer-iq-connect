
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Video, User, TrendingUp, Award, Search, Filter, ArrowLeft, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data for referrals
  const referrals = [
    {
      id: 1,
      candidateName: "Sarah Johnson",
      position: "Senior Software Engineer",
      referrerName: "Mike Chen",
      relationship: "Former Colleague",
      status: "Under Review",
      aiScore: 92,
      sentimentScore: 88,
      cultureFit: 85,
      date: "2024-01-15",
      hasVideo: true
    },
    {
      id: 2,
      candidateName: "David Rodriguez",
      position: "Product Manager",
      referrerName: "Lisa Wang",
      relationship: "Friend",
      status: "Interview Scheduled",
      aiScore: 87,
      sentimentScore: 91,
      cultureFit: 82,
      date: "2024-01-12",
      hasVideo: true
    },
    {
      id: 3,
      candidateName: "Emily Thompson",
      position: "UX Designer",
      referrerName: "James Miller",
      relationship: "Former Colleague",
      status: "Pending Review",
      aiScore: 89,
      sentimentScore: 85,
      cultureFit: 90,
      date: "2024-01-10",
      hasVideo: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Under Review": return "bg-yellow-100 text-yellow-800";
      case "Interview Scheduled": return "bg-green-100 text-green-800";
      case "Pending Review": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  const filteredReferrals = referrals.filter(referral => {
    const matchesSearch = referral.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         referral.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || referral.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">ReferIQ Dashboard</h1>
            </div>
            <Button onClick={() => navigate('/refer')} className="bg-gradient-to-r from-blue-600 to-indigo-600">
              <Video className="w-4 h-4 mr-2" />
              New Referral
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+3 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interview Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground">+12% improvement</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg AI Score</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">Excellent quality</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hire Rate</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42%</div>
              <p className="text-xs text-muted-foreground">+18% vs baseline</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Referral Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search candidates or positions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Pending Review">Pending Review</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Interview Scheduled">Interview Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Referrals List */}
        <div className="space-y-4">
          {filteredReferrals.map((referral) => (
            <Card key={referral.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{referral.candidateName}</h3>
                      <Badge className={getStatusColor(referral.status)}>
                        {referral.status}
                      </Badge>
                      {referral.hasVideo && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Video className="w-3 h-3" />
                          Video
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 mb-1">{referral.position}</p>
                    <p className="text-sm text-gray-500">
                      Referred by {referral.referrerName} • {referral.relationship} • {referral.date}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 lg:items-center">
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">AI Score</p>
                        <p className={`font-semibold ${getScoreColor(referral.aiScore)}`}>
                          {referral.aiScore}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Sentiment</p>
                        <p className={`font-semibold ${getScoreColor(referral.sentimentScore)}`}>
                          {referral.sentimentScore}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Culture Fit</p>
                        <p className={`font-semibold ${getScoreColor(referral.cultureFit)}`}>
                          {referral.cultureFit}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Play className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm">Review</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReferrals.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No referrals found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || filterStatus !== "all" 
                  ? "Try adjusting your search or filter criteria" 
                  : "Start by creating your first referral"}
              </p>
              <Button onClick={() => navigate('/refer')}>
                <Video className="w-4 h-4 mr-2" />
                Create Referral
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
