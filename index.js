const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let projects = [
  {
    id: 1,
    name: 'Design a Logo',
    description: 'Create a logo for a new startup company.',
    teamMembers: ['John', 'Sarah', 'Mike'],
    files: [
      {
        id: 1,
        name: 'Logo Sketch',
        url: 'https://example.com/logo-sketch.png'
      },
      {
        id: 2,
        name: 'Logo Final',
        url: 'https://example.com/logo-final.png'
      }
    ],
    chats: [
      {
        id: 1,
        sender: 'John',
        message: 'Hey guys, what do you think of this design?',
        timestamp: '2022-01-01T00:00:00.000Z'
      },
      {
        id: 2,
        sender: 'Sarah',
        message: 'I like it! Can we try a different font?',
        timestamp: '2022-01-01T00:01:00.000Z'
      },
      {
        id: 3,
        sender: 'Mike',
        message: 'Sure, let me make some changes and upload a new version.',
        timestamp: '2022-01-01T00:02:00.000Z'
      }
    ]
  },
  {
    id: 2,
    name: 'Develop a Website',
    description: 'Build a website for a local non-profit organization.',
    teamMembers: ['Emily', 'David', 'Lisa'],
    files: [
      {
        id: 1,
        name: 'Website Wireframe',
        url: 'https://example.com/website-wireframe.png'
      },
      {
        id: 2,
        name: 'Website Mockup',
        url: 'https://example.com/website-mockup.png'
      },
      {
        id: 3,
        name: 'Website Code',
        url: 'https://example.com/website-code.zip'
      }
    ],
    chats: [
      {
        id: 1,
        sender: 'Emily',
        message: 'Hey team, let\'s have a meeting to go over the wireframe.',
        timestamp: '2022-01-01T00:00:00.000Z'
      },
      {
        id: 2,
        sender: 'David',
        message: 'Sounds good, what time works for everyone?',
        timestamp: '2022-01-01T00:01:00.000Z'
      },
      {
        id: 3,
        sender: 'Lisa',
        message: 'I\'m free tomorrow afternoon, does that work for everyone?',
        timestamp: '2022-01-01T00:02:00.000Z'
      }
    ]
  }
];

app.get('/projects', (req, res) => {
  res.send(projects);
});

app.get('/projects/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const project = projects.find(project => project.id === id);
  if (project) {
    res.send(project);
  } else {
    res.status(404).send('Project not found');
  }
});

app.post('/projects', (req, res) => {
  const project = req.body;
  project.id = projects.length + 1;
  project.files = [];
  project.chats = [];
  projects.push(project);
  res.send(project);
});

app.post('/projects/:id/files', (req, res) => {
  const id = parseInt(req.params.id);
  const project = projects.find(project => project.id === id);
  if (project) {
    const file = req.body;
    file.id = project.files.length + 1;
    project.files.push(file);
    res.send(file);
  } else {
    res.status(404).send('Project not found');
  }
});

app.post('/projects/:id/chats', (req, res) => {
  const id = parseInt(req.params.id);
  const project = projects.find(project => project.id === id);
  if (project) {
    const chat = req.body;
    chat.id = project.chats.length + 1;
    project.chats.push(chat);
    res.send(chat);
  } else {
    res.status(404).send('Project not found');
  }
});

app.put('/projects/:id', (req, res) => {