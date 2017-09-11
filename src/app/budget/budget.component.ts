import { Component, ElementRef, OnInit } from '@angular/core';
import { D3Service, D3 } from 'd3-ng2-service';
import { HttpClient } from '@angular/common/http';
import { HierarchyCircularNode } from 'd3-hierarchy';
import { BudgetItem } from '../budget-item';


@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  private d3: D3;
  private parentNativeElement: any;

  constructor(element: ElementRef, d3Service: D3Service, private http: HttpClient) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
   this.http.get('/assets/budget-2017.csv', {responseType: 'text'}).subscribe(data => {
      // Read the result field from the JSON response.
      this.render(this.d3.csvParse(data));
    });
  }

  render(data: any) {
    const d3 = this.d3;
    const margin = {top: 0, right: 0, bottom: 0, left: 0};
    const fullWidth = 600;
    const fullHeight = 600;
    const width = fullWidth - margin.left - margin.right;
    const height = fullHeight - margin.top - margin.bottom;

    const pack = d3.pack()
      .size([width, width])
      .padding(5);

    data.map(i => {
      i.amount = +i.amount;
      return i;
    });

    data = {name: 'total', children: data};

    const svg = d3.select(this.parentNativeElement)
      .select('.budget')
      .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const root = d3.hierarchy(data)
      .sum((d) => d.amount)
      .sort((a, b) => b.value - a.value);

    const node = svg.selectAll('.node')
      .data(pack(root).descendants())
      .enter()
      .append('g')
      .attr('class', (d: HierarchyCircularNode<BudgetItem>) => d.children ? 'node' : 'leaf node')
      .attr('transform', (d: HierarchyCircularNode<BudgetItem>) => `translate(${d.x}, ${d.y})`);

    node.append('circle')
      .attr('r', (d: HierarchyCircularNode<BudgetItem>) => d.r);

    node.append('title')
      .text((d: HierarchyCircularNode<BudgetItem>) => `${d.data.title}\n${d.value}`);

    node.filter((d: HierarchyCircularNode<BudgetItem>) => !d.children)
      .append('text')
      .attr('dy', '0.3em')
      .text((d: HierarchyCircularNode<BudgetItem>) => d.data.title.substring(0, d.r / 3));
  }

}
